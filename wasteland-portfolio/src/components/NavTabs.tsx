import { buildings } from '../data/mapData';
import type { BuildingDef } from '../engine/types';
import './NavTabs.css';

interface Props {
  onBuildingClick: (b: BuildingDef) => void;
}

export default function NavTabs({ onBuildingClick }: Props) {
  return (
    <nav className="nav-tabs">
      {buildings.filter((b) => !b.decorative).map((b) => (
        <button
          key={b.id}
          className="nav-tab"
          onClick={() => onBuildingClick(b)}
        >
          {b.label}
        </button>
      ))}
    </nav>
  );
}
