import { useEffect, useState } from 'react';
import './LoadingScreen.css';

const DISPLAY_MS = 750;
const FADE_MS = 180;

export default function LoadingScreen() {
  const [ending, setEnding] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => {
      setEnding(true);
    }, DISPLAY_MS);

    const hideTimer = window.setTimeout(() => {
      setHidden(true);
    }, DISPLAY_MS + FADE_MS);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div className={`loading-screen ${ending ? 'ending' : ''}`} aria-hidden>
      <div className="loading-screen__label">
        Loading 3D Models ...
      </div>
    </div>
  );
}
