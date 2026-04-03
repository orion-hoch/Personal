import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  Vignette,
} from '@react-three/postprocessing';
import * as THREE from 'three';
import { lightSources } from '../data/mapData';
import { gridTo3D, GROUND_SIZE } from '../engine/gridUtils';

const ACTIVE_LIGHT_SOURCES = lightSources.filter((source) => source.intensity >= 0.45);

/** Animated point light with flicker */
function FlickerLight({ col, row, color, intensity }: { col: number; row: number; color: string; intensity: number }) {
  const lightRef = useRef<THREE.PointLight>(null);
  const [x, , z] = gridTo3D(col, row);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (lightRef.current) {
      const t = clock.getElapsedTime();
      const flicker = Math.sin(t * 3 + phase) * 0.15 + Math.sin(t * 7.3 + phase * 2) * 0.08;
      lightRef.current.intensity = (intensity * 9.5) + flicker * 3.2;
    }
  });

  // Larger radius lights get placed higher and reach further
  const isLarge = intensity > 0.8;

  return (
    <pointLight
      ref={lightRef}
      position={[x, isLarge ? 6 : 1.5, z]}
      color={color}
      intensity={intensity * 9.5}
      distance={isLarge ? 30 : 10}
      decay={2}
    />
  );
}

/** Ash particles falling across the scene */
function AshParticles() {
  const count = 120;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * GROUND_SIZE;
      arr[i * 3 + 1] = Math.random() * 15;
      arr[i * 3 + 2] = (Math.random() - 0.5) * GROUND_SIZE;
    }
    return arr;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const posArray = (ref.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    const t = clock.getDelta();
    for (let i = 0; i < count; i++) {
      // Drift down and sideways
      posArray[i * 3] += Math.sin(clock.getElapsedTime() + i) * 0.003;
      posArray[i * 3 + 1] -= t * 0.5;
      posArray[i * 3 + 2] += Math.cos(clock.getElapsedTime() + i * 0.7) * 0.002;

      // Reset if below ground
      if (posArray[i * 3 + 1] < 0) {
        posArray[i * 3] = (Math.random() - 0.5) * GROUND_SIZE;
        posArray[i * 3 + 1] = 12 + Math.random() * 5;
        posArray[i * 3 + 2] = (Math.random() - 0.5) * GROUND_SIZE;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#B0A898"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export default function Atmosphere() {
  return (
    <>
      {/* Ambient light — brighter for a more lit town feel */}
      <ambientLight intensity={0.32} color="#9999AA" />

      {/* Directional light — warmer, stronger, as if from the lighthouse */}
      <directionalLight
        position={[10, 15, 10]}
        intensity={0.34}
        color="#F0D890"
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-far={45}
        shadow-camera-left={-22}
        shadow-camera-right={22}
        shadow-camera-top={22}
        shadow-camera-bottom={-22}
      />

      {/* Point lights from lightSources data */}
      {ACTIVE_LIGHT_SOURCES.map((ls, i) => (
        <FlickerLight key={i} col={ls.col} row={ls.row} color={ls.color} intensity={ls.intensity} />
      ))}

      {/* Ember sparkles near light sources */}
      {ACTIVE_LIGHT_SOURCES.slice(0, 3).map((ls, i) => {
        const [x, , z] = gridTo3D(ls.col, ls.row);
        return (
          <Sparkles
            key={`spark-${i}`}
            position={[x, 1, z]}
            count={4}
            scale={2.5}
            size={1}
            speed={0.2}
            color={ls.color}
          />
        );
      })}

      {/* Ash particles */}
      <AshParticles />

      {/* Fog for void-edge darkness — pushed further out since town is brighter */}
      <fog attach="fog" args={['#000000', 25, 55]} />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.65}
          luminanceSmoothing={0.2}
          intensity={0.3}
        />
        <Vignette
          eskil={false}
          offset={0.25}
          darkness={0.9}
        />
      </EffectComposer>
    </>
  );
}
