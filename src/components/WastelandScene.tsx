import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import Ground from './Ground';
import Building3D from './Building3D';
import BuildingLabel from './BuildingLabel';
import CameraRig from './CameraRig';
import Atmosphere from './Atmosphere';
import { buildings } from '../data/mapData';
import { getBuildingAnchor, gridTo3D } from '../engine/gridUtils';
import type { BuildingDef } from '../engine/types';
import './BuildingLabel.css';

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
  const lighthouse = buildings.find((building) => building.id === 'lighthouse');

  return (
    <Canvas
      dpr={[1, 1.25]}
      camera={{ position: [0, 10.5, 28], fov: 45, near: 0.1, far: 100 }}
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

      {lighthouse && !focusedBuilding && <LighthouseIntro building={lighthouse} />}
    </Canvas>
  );
}

function LighthouseIntro({ building }: { building: BuildingDef }) {
  const [centerCol, centerRow] = getBuildingAnchor(building);
  const [x, , z] = gridTo3D(centerCol, centerRow);

  return (
    <Html
      position={[x + 3.5, building.boxSize[1] * 0.55, z + 0.5]}
      distanceFactor={12}
      occlude={false}
      style={{ pointerEvents: 'none' }}
    >
      <div className="map-label map-label--intro map-label--speech">
        Hey welcome to my website! Click to explore my Portfolio!
      </div>
    </Html>
  );
}
