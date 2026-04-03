import { Html } from '@react-three/drei';
import type { BuildingDef } from '../engine/types';
import { getBuildingAnchor, gridTo3D } from '../engine/gridUtils';
import './BuildingLabel.css';

interface Props {
  building: BuildingDef;
  isHovered: boolean;
  visible: boolean;
  onClick: () => void;
}

export default function BuildingLabel({ building, isHovered, visible, onClick }: Props) {
  const [centerCol, centerRow] = getBuildingAnchor(building);
  const [x, , z] = gridTo3D(centerCol, centerRow);
  const labelY = building.boxSize[1] + 1.5;

  if (!visible) return null;

  return (
    <Html
      position={[x, labelY, z]}
      center
      distanceFactor={15}
      occlude={false}
      style={{ pointerEvents: 'auto' }}
    >
      <div
        className={`map-label ${isHovered ? 'hovered' : ''}`}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
      >
        {building.label}
      </div>
    </Html>
  );
}
