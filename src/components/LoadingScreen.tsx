import { useEffect, useState } from 'react';
import './LoadingScreen.css';

export default function LoadingScreen() {
  const [opening, setOpening] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const openTimer = window.setTimeout(() => setOpening(true), 80);
    const hideTimer = window.setTimeout(() => setHidden(true), 1080);

    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div className={`loading-screen ${opening ? 'opening' : ''}`} aria-hidden>
      <div className="loading-screen__glow" />
      <div className="loading-screen__door loading-screen__door--left" />
      <div className="loading-screen__door loading-screen__door--right" />
      <div className="loading-screen__hub">
        <div className="loading-screen__hub-ring" />
        <div className="loading-screen__hub-core" />
      </div>
      <div className="loading-screen__label">
        <span className="loading-screen__eyebrow">BUNKER ACCESS</span>
        <span className="loading-screen__title">INITIALIZING WASTELAND</span>
      </div>
    </div>
  );
}
