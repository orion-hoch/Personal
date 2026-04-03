import { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import type { ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { BuildingDef } from '../engine/types';
import { buildings } from '../data/mapData';
import { getBuildingAnchor, gridTo3D, TILE_SPACING } from '../engine/gridUtils';

interface Props {
  building: BuildingDef;
  onClick: () => void;
  onHover: (hovered: boolean) => void;
  isHovered: boolean;
}

function normalizeModelNodeName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function findModelNode(root: THREE.Object3D, targetName: string) {
  const exact = root.getObjectByName(targetName);
  if (exact) return exact;

  const normalizedTarget = normalizeModelNodeName(targetName);
  let fuzzyMatch: THREE.Object3D | null = null;

  root.traverse((child) => {
    if (!fuzzyMatch && normalizeModelNodeName(child.name) === normalizedTarget) {
      fuzzyMatch = child;
    }
  });

  return fuzzyMatch;
}

for (const building of buildings) {
  if (building.modelFile) {
    useGLTF.preload(`/models/${building.modelFile}`);
  }
}

/** Try to load a GLB model, fallback to placeholder box */
function GLBModel({ building, isHovered }: { building: BuildingDef; isHovered: boolean }) {
  // Only load GLB when modelFile is explicitly set — no auto-detection
  if (!building.modelFile) {
    return <PlaceholderBox building={building} isHovered={isHovered} />;
  }

  const modelPath = `/models/${building.modelFile}`;
  const [hasModel, setHasModel] = useState<boolean | null>(null);

  useEffect(() => {
    fetch(modelPath, { method: 'HEAD' })
      .then((res) => {
        const ct = res.headers.get('content-type') || '';
        setHasModel(res.ok && !ct.includes('text/html'));
      })
      .catch(() => setHasModel(false));
  }, [modelPath]);

  if (hasModel === null) return <PlaceholderBox building={building} isHovered={isHovered} />;
  if (!hasModel) return <PlaceholderBox building={building} isHovered={isHovered} />;

  return (
    <Suspense fallback={<PlaceholderBox building={building} isHovered={isHovered} />}>
      <LoadedModel path={modelPath} building={building} />
    </Suspense>
  );
}

function LoadedModel({ path, building }: { path: string; building: BuildingDef }) {
  const { scene } = useGLTF(path);
  const cloned = useMemo(() => {
    const c = scene.clone(true);

    let root: THREE.Object3D = c;
    if (building.modelNodeName) {
      const selectedNode = findModelNode(c, building.modelNodeName);
      if (selectedNode) {
        const isolated = selectedNode.clone(true);
        root = new THREE.Group();
        root.add(isolated);
      } else {
        const availableNames: string[] = [];
        c.traverse((child) => {
          if (child.name) availableNames.push(child.name);
        });
        console.warn(
          `[Building3D] Node "${building.modelNodeName}" not found in ${path}. Rendering full scene. Available nodes: ${availableNames.join(', ')}`,
        );
      }
    }

    // Deep-clone materials to avoid shared references between instances
    root.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          mesh.material = (mesh.material as THREE.Material).clone();
        }
        mesh.castShadow = false;
        mesh.receiveShadow = false;
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();
      }
    });
    return root;
  }, [scene, building.modelNodeName, path]);

  // Scale model to fit building footprint, center in XZ, sit on ground in Y
  const { scale, offset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = Math.max(building.width, building.height) * TILE_SPACING * 0.7;
    const s = targetSize / maxDim;

    return {
      scale: s,
      offset: new THREE.Vector3(
        -center.x * s,   // center XZ
        -box.min.y * s,   // bottom on ground
        -center.z * s     // center XZ
      ),
    };
  }, [cloned, building]);

  return (
    <primitive
      object={cloned}
      scale={[scale, scale, scale]}
      position={[offset.x, offset.y, offset.z]}
    />
  );
}

function PlaceholderBox({ building, isHovered }: { building: BuildingDef; isHovered: boolean }) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const [w, h, d] = building.boxSize;

  useFrame(() => {
    if (matRef.current) {
      const target = isHovered ? 0.3 : 0;
      matRef.current.emissiveIntensity += (target - matRef.current.emissiveIntensity) * 0.15;
    }
  });

  const details: ReactNode[] = [];
  const showDefaultWindows = !['signpost', 'lighthouse', 'ferriswheel', 'radiotower'].includes(building.type);

  // ─── Type-specific placeholder details ───

  if (building.type === 'lighthouse') {
    // Tall cylindrical tower with light at top
    return (
      <group>
        <mesh position={[0, h / 2, 0]} castShadow>
          <cylinderGeometry args={[1, 1.5, h, 12]} />
          <meshStandardMaterial ref={matRef} color={building.color} roughness={0.8} emissive={building.color} emissiveIntensity={0} />
        </mesh>
        {/* Lantern room */}
        <mesh position={[0, h + 0.5, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 1.5, 12]} />
          <meshStandardMaterial color="#D4A040" emissive="#F0D890" emissiveIntensity={2} transparent opacity={0.8} />
        </mesh>
        {/* Beacon light */}
        <pointLight position={[0, h + 1, 0]} color="#F0D890" intensity={15} distance={30} decay={2} />
        {/* Railing */}
        <mesh position={[0, h - 0.1, 0]}>
          <torusGeometry args={[1.4, 0.05, 8, 16]} />
          <meshStandardMaterial color="#4A4A50" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>
    );
  }

  if (building.type === 'ferriswheel') {
    // Tilted wheel with spokes
    return (
      <group>
        {/* Support structure */}
        <mesh position={[-1, 1.5, 0]} rotation={[0, 0, 0.15]}>
          <boxGeometry args={[0.3, 3, 0.3]} />
          <meshStandardMaterial color="#6A4A3A" roughness={0.8} metalness={0.3} />
        </mesh>
        <mesh position={[1, 1.5, 0]} rotation={[0, 0, -0.15]}>
          <boxGeometry args={[0.3, 3, 0.3]} />
          <meshStandardMaterial color="#6A4A3A" roughness={0.8} metalness={0.3} />
        </mesh>
        {/* Wheel rim — tilted */}
        <group position={[0, 3.5, 0]} rotation={[0.1, 0, 0.08]}>
          <mesh>
            <torusGeometry args={[2.5, 0.1, 8, 24]} />
            <meshStandardMaterial color="#5A3A2A" roughness={0.7} metalness={0.4} />
          </mesh>
          {/* Spokes */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <mesh key={i} rotation={[0, 0, (i * Math.PI) / 3]}>
              <boxGeometry args={[5, 0.06, 0.06]} />
              <meshStandardMaterial color="#5A4A40" metalness={0.5} roughness={0.5} />
            </mesh>
          ))}
          {/* A couple of cars */}
          {[0, 2, 4].map((i) => {
            const angle = (i * Math.PI) / 3;
            return (
              <mesh key={`car-${i}`} position={[Math.cos(angle) * 2.5, Math.sin(angle) * 2.5, 0]}>
                <boxGeometry args={[0.5, 0.7, 0.4]} />
                <meshStandardMaterial color="#8A5A3A" roughness={0.9} />
              </mesh>
            );
          })}
          {/* Lantern in one car */}
          <pointLight position={[2.5, 0, 0]} color="#D08030" intensity={2} distance={5} decay={2} />
        </group>
      </group>
    );
  }

  if (building.type === 'radiotower') {
    // Tall lattice tower
    return (
      <group>
        {/* Tower legs */}
        {[[-0.5, 0, -0.5], [0.5, 0, -0.5], [-0.5, 0, 0.5], [0.5, 0, 0.5]].map((pos, i) => (
          <mesh key={`leg-${i}`} position={[pos[0], h / 2, pos[2]]}>
            <boxGeometry args={[0.15, h, 0.15]} />
            <meshStandardMaterial color="#4A4A50" metalness={0.7} roughness={0.4} />
          </mesh>
        ))}
        {/* Cross braces */}
        {[1, 2.5, 4, 5.5].map((y, i) => (
          <mesh key={`brace-${i}`} position={[0, y, 0]}>
            <boxGeometry args={[1.2, 0.06, 1.2]} />
            <meshStandardMaterial color="#5A5A60" metalness={0.6} roughness={0.4} />
          </mesh>
        ))}
        {/* Antenna tip */}
        <mesh position={[0, h + 0.5, 0]}>
          <cylinderGeometry args={[0.03, 0.08, 1.5, 6]} />
          <meshStandardMaterial color="#4A4A50" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Blinking red light */}
        <mesh position={[0, h + 1.3, 0]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color="#D04040" emissive="#D04040" emissiveIntensity={3} />
        </mesh>
        {/* Satellite dish */}
        <mesh position={[0.8, h * 0.6, 0]} rotation={[0.3, 0.5, 0]}>
          <circleGeometry args={[0.6, 12]} />
          <meshStandardMaterial color="#6A6A70" metalness={0.5} roughness={0.5} side={THREE.DoubleSide} />
        </mesh>
        {/* Equipment shed at base */}
        <mesh position={[1.2, 0.5, 0]} castShadow>
          <boxGeometry args={[1.5, 1, 1.2]} />
          <meshStandardMaterial color="#5A5550" roughness={0.85} />
        </mesh>
        <mesh position={[1.2, 0.5, 0.65]}>
          <boxGeometry args={[0.6, 0.7, 0.05]} />
          <meshStandardMaterial color="#D4A040" emissive="#D4A040" emissiveIntensity={0.5} />
        </mesh>
      </group>
    );
  }

  if (building.type === 'radio_tower') {
    details.push(
      <mesh key="antenna" position={[0, h / 2 + 2, 0]}>
        <cylinderGeometry args={[0.08, 0.15, 4, 6]} />
        <meshStandardMaterial color="#4A4A50" metalness={0.8} roughness={0.3} />
      </mesh>,
      <mesh key="light" position={[0, h / 2 + 4.1, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#D04040" emissive="#D04040" emissiveIntensity={2} />
      </mesh>
    );
  }

  if (building.type === 'trading_post') {
    details.push(
      <mesh key="sign" position={[0, h / 2 + 0.5, d / 2 + 0.1]}>
        <boxGeometry args={[2, 0.5, 0.1]} />
        <meshStandardMaterial color="#40D080" emissive="#40D080" emissiveIntensity={1.5} />
      </mesh>
    );
  }

  if (building.type === 'bunker') {
    details.push(
      <mesh key="door-glow" position={[0, 0.3, d / 2 + 0.05]}>
        <boxGeometry args={[1.2, 1.5, 0.1]} />
        <meshStandardMaterial color="#D4A040" emissive="#D4A040" emissiveIntensity={0.8} />
      </mesh>
    );
  }

  if (building.type === 'town_hall') {
    [-1.5, -0.5, 0.5, 1.5].forEach((cx, i) => {
      details.push(
        <mesh key={`col-${i}`} position={[cx, 0, d / 2 + 0.3]}>
          <cylinderGeometry args={[0.12, 0.12, h, 8]} />
          <meshStandardMaterial color="#9A9590" roughness={0.7} />
        </mesh>
      );
    });
  }

  if (building.type === 'signpost') {
    details.push(
      <mesh key="post" position={[0, h / 2 + 1, 0]}>
        <cylinderGeometry args={[0.08, 0.08, h + 2, 6]} />
        <meshStandardMaterial color="#4A3A20" roughness={0.9} />
      </mesh>
    );
    [-0.8, 0, 0.8].forEach((sy, i) => {
      details.push(
        <mesh key={`sign-${i}`} position={[i % 2 === 0 ? 0.6 : -0.6, h / 2 + 1.5 + sy, 0]} rotation={[0, i * 0.3, 0]}>
          <boxGeometry args={[1.2, 0.3, 0.05]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#6A5A40' : '#4A3A20'} roughness={0.9} />
        </mesh>
      );
    });
  }

  return (
    <group>
      <mesh position={[0, h / 2, 0]} castShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial
          ref={matRef}
          color={building.color}
          roughness={0.85}
          metalness={0.1}
          emissive={building.color}
          emissiveIntensity={0}
        />
      </mesh>
      {showDefaultWindows && (
        <>
          <mesh position={[-w * 0.25, h * 0.6, d / 2 + 0.05]}>
            <boxGeometry args={[0.6, 0.5, 0.05]} />
            <meshStandardMaterial color="#D4A040" emissive="#D4A040" emissiveIntensity={0.6} />
          </mesh>
          <mesh position={[w * 0.25, h * 0.4, d / 2 + 0.05]}>
            <boxGeometry args={[0.6, 0.5, 0.05]} />
            <meshStandardMaterial color="#D4A040" emissive="#D4A040" emissiveIntensity={0.4} />
          </mesh>
        </>
      )}
      {details}
    </group>
  );
}

/** Glowing selection ring flat on the ground */
function SelectionRing({ radius, visible }: { radius: number; visible: boolean }) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ringRef.current) {
      const targetOpacity = visible ? 0.78 : 0;
      const targetScale = visible ? 1.04 : 1;
      const mat = ringRef.current.material as THREE.MeshStandardMaterial;

      mat.opacity = THREE.MathUtils.damp(mat.opacity, targetOpacity, visible ? 8 : 2.8, delta);
      mat.emissiveIntensity = THREE.MathUtils.damp(mat.emissiveIntensity, visible ? 1.9 : 1.1, visible ? 7 : 2.2, delta);
      ringRef.current.scale.x = THREE.MathUtils.damp(ringRef.current.scale.x, targetScale, visible ? 7 : 2.4, delta);
      ringRef.current.scale.z = THREE.MathUtils.damp(ringRef.current.scale.z, targetScale, visible ? 7 : 2.4, delta);
      ringRef.current.rotation.z += delta * (visible ? 0.35 : 0.12);

      // Keep the faint cool-down glow visible just a bit longer after hover ends.
      if (!visible && mat.opacity < 0.02) {
        mat.opacity = 0;
      }
    }
  });

  return (
    <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
      <ringGeometry args={[radius - 0.15, radius, 48]} />
      <meshStandardMaterial
        color="#D4A040"
        emissive="#D4A040"
        emissiveIntensity={1.1}
        transparent
        opacity={0}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function Building3D({ building, onClick, onHover, isHovered }: Props) {
  const groupRef = useRef<THREE.Group>(null);

  const [centerCol, centerRow] = getBuildingAnchor(building);
  const [x, , z] = gridTo3D(centerCol, centerRow);

  const ringRadius = Math.max(building.width, building.height) * TILE_SPACING * 0.5;
  const isInteractive = !building.decorative;

  useFrame(() => {
    if (groupRef.current && isInteractive) {
      const targetY = isHovered ? 0.15 : 0;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.1;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[x, 0, z]}
      onClick={isInteractive ? (e) => { e.stopPropagation(); onClick(); } : undefined}
      onPointerOver={isInteractive ? (e) => { e.stopPropagation(); onHover(true); document.body.style.cursor = 'pointer'; } : undefined}
      onPointerOut={isInteractive ? () => { onHover(false); document.body.style.cursor = 'default'; } : undefined}
    >
      <GLBModel building={building} isHovered={isHovered} />
      {isInteractive && <SelectionRing radius={ringRadius} visible={isHovered} />}
    </group>
  );
}
