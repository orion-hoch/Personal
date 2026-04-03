import { useEffect, useState } from 'react';
import './LoadingScreen.css';

export default function LoadingScreen() {
  const [opening, setOpening] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const openTimer = window.setTimeout(() => setOpening(true), 700);
    const hideTimer = window.setTimeout(() => setHidden(true), 2250);

    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div className={`loading-screen ${opening ? 'opening' : ''}`} aria-hidden>
      <div className="loading-screen__door loading-screen__door--left" />
      <div className="loading-screen__door loading-screen__door--right" />
      <div className="loading-screen__press">
        <div className="loading-screen__ram loading-screen__ram--upper" />
        <div className="loading-screen__hub" />
        <div className="loading-screen__ram loading-screen__ram--lower" />
      </div>
      <div className="loading-screen__label">
        <span className="loading-screen__eyebrow">VAULT PRESSURE LOCK</span>
        <span className="loading-screen__title">Loading 3D Models</span>
        <span className="loading-screen__status">Please stand by while the scene initializes.</span>
      </div>
    </div>
  );
}
