import { lazy, Suspense, useCallback, useState } from 'react';
import WastelandScene from './components/WastelandScene';
import NeonHeader from './components/NeonHeader';
import LoadingScreen from './components/LoadingScreen';
import type { BuildingDef } from './engine/types';
import type { VisualizationSequenceId } from './data/visualizationSequences';

const InteriorPanel = lazy(() => import('./components/InteriorPanel'));
const VisualizationSequence = lazy(() => import('./components/visualization/VisualizationSequence'));

function App() {
  const [focusedBuilding, setFocusedBuilding] = useState<BuildingDef | null>(null);
  const [activeVisualization, setActiveVisualization] = useState<VisualizationSequenceId | null>(null);

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
        focusedBuilding={focusedBuilding}
        onBuildingClick={handleBuildingClick}
        onUnfocus={handleUnfocus}
      />
      <NeonHeader />
      <Suspense fallback={null}>
        {focusedBuilding && (
          <InteriorPanel
            buildingId={focusedBuilding.id}
            onClose={handleUnfocus}
            onOpenVisualization={setActiveVisualization}
          />
        )}
        {activeVisualization && (
          <VisualizationSequence
            sequenceId={activeVisualization}
            onClose={() => setActiveVisualization(null)}
          />
        )}
      </Suspense>
      {/* Help hint */}
      <div style={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: "'VT323', 'Courier New', monospace",
        fontSize: 16,
        color: 'rgba(236, 231, 223, 0.82)',
        letterSpacing: 2,
        pointerEvents: 'none',
        zIndex: 5,
        userSelect: 'none',
        padding: '6px 12px',
        background: 'rgba(0, 0, 0, 0.45)',
        border: '1px solid rgba(86, 101, 93, 0.28)',
        textShadow: '0 1px 2px rgba(0, 0, 0, 0.75)',
      }}>
        DRAG TO ROTATE • SCROLL TO ZOOM • CLICK LOCATIONS TO EXPLORE
      </div>
    </>
  );
}

export default App;
