import { useState, useCallback } from 'react';
import WastelandScene from './components/WastelandScene';
import NeonHeader from './components/NeonHeader';
import InteriorPanel from './components/InteriorPanel';
import LoadingScreen from './components/LoadingScreen';
import type { BuildingDef } from './engine/types';

function App() {
  const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null);
  const [focusedBuilding, setFocusedBuilding] = useState<BuildingDef | null>(null);

  const handleBuildingClick = useCallback((b: BuildingDef) => {
    if (b.decorative) return;
    setFocusedBuilding(b);
  }, []);

  const handleUnfocus = useCallback(() => {
    setFocusedBuilding(null);
  }, []);

  return (
    <>
      <LoadingScreen />
      <WastelandScene
        hoveredBuilding={hoveredBuilding}
        onHoverChange={setHoveredBuilding}
        focusedBuilding={focusedBuilding}
        onBuildingClick={handleBuildingClick}
        onUnfocus={handleUnfocus}
      />
      <NeonHeader />
      <InteriorPanel
        buildingId={focusedBuilding?.id ?? null}
        onClose={handleUnfocus}
      />
      {/* Help hint */}
      <div style={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: "'VT323', 'Courier New', monospace",
        fontSize: 13,
        color: 'rgba(212, 160, 64, 0.25)',
        letterSpacing: 2,
        pointerEvents: 'none',
        zIndex: 5,
        userSelect: 'none',
      }}>
        DRAG TO ROTATE • SCROLL TO ZOOM • CLICK LOCATIONS TO EXPLORE
      </div>
    </>
  );
}

export default App;
