import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import Ground from './Ground';
import Building3D from './Building3D';
import BuildingLabel from './BuildingLabel';
import CameraRig from './CameraRig';
import Atmosphere from './Atmosphere';
import { buildings } from '../data/mapData';
import type { BuildingDef } from '../engine/types';

interface Props {
  focusedBuilding: BuildingDef | null;
  onBuildingClick: (b: BuildingDef) => void;
  onUnfocus: () => void;
}

export default function WastelandScene({
  focusedBuilding,
  onBuildingClick,
  onUnfocus,
}: Props) {
  return (
    <Canvas
      dpr={[1, 1.25]}
      camera={{ position: [20, 18, 20], fov: 45, near: 0.1, far: 100 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#000000',
      }}
      gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
      shadows={{ type: THREE.PCFShadowMap }}
    >
      <color attach="background" args={['#000000']} />

      <CameraRig focusedBuilding={focusedBuilding} onUnfocus={onUnfocus} />
      <Atmosphere />
      <Ground />

      {buildings.map((b) => (
        <Building3D
          key={b.id}
          building={b}
          onClick={() => onBuildingClick(b)}
        />
      ))}

      {buildings.filter((b) => !b.decorative).map((b) => (
        <BuildingLabel
          key={`label-${b.id}`}
          building={b}
          visible={!focusedBuilding || focusedBuilding.id === b.id}
          onClick={() => onBuildingClick(b)}
        />
      ))}
    </Canvas>
  );
}
