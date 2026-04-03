import { Canvas } from '@react-three/fiber';
import Ground from './Ground';
import Building3D from './Building3D';
import BuildingLabel from './BuildingLabel';
import CameraRig from './CameraRig';
import Atmosphere from './Atmosphere';
import { buildings } from '../data/mapData';
import type { BuildingDef } from '../engine/types';

interface Props {
  hoveredBuilding: string | null;
  onHoverChange: (id: string | null) => void;
  focusedBuilding: BuildingDef | null;
  onBuildingClick: (b: BuildingDef) => void;
  onUnfocus: () => void;
}

export default function WastelandScene({
  hoveredBuilding,
  onHoverChange,
  focusedBuilding,
  onBuildingClick,
  onUnfocus,
}: Props) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [20, 18, 20], fov: 45, near: 0.1, far: 100 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#000000',
      }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      shadows
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
          onHover={(h) => onHoverChange(h ? b.id : null)}
          isHovered={hoveredBuilding === b.id}
        />
      ))}

      {buildings.filter((b) => !b.decorative).map((b) => (
        <BuildingLabel
          key={`label-${b.id}`}
          building={b}
          isHovered={hoveredBuilding === b.id}
          visible={!focusedBuilding || focusedBuilding.id === b.id}
          onClick={() => onBuildingClick(b)}
        />
      ))}
    </Canvas>
  );
}
