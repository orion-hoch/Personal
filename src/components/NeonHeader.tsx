import { useEffect, useRef } from 'react';
import './NeonHeader.css';

export default function NeonHeader() {
  const flickerRef = useRef<HTMLSpanElement>(null);

  // Random flicker on specific letters to simulate dying neon
  useEffect(() => {
    const flickerElements = document.querySelectorAll('.neon-flicker');
    const intervals: number[] = [];

    flickerElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const baseOpacity = 0.7 + Math.random() * 0.3;
      htmlEl.style.opacity = String(baseOpacity);

      const interval = window.setInterval(() => {
        if (Math.random() < 0.3) {
          // Flicker off briefly
          htmlEl.style.opacity = String(0.1 + Math.random() * 0.3);
          setTimeout(() => {
            htmlEl.style.opacity = String(baseOpacity);
          }, 50 + Math.random() * 100);
        }
        if (Math.random() < 0.1) {
          // Double flicker
          htmlEl.style.opacity = '0.15';
          setTimeout(() => {
            htmlEl.style.opacity = String(baseOpacity);
            setTimeout(() => {
              htmlEl.style.opacity = '0.2';
              setTimeout(() => {
                htmlEl.style.opacity = String(baseOpacity);
              }, 40);
            }, 60);
          }, 50);
        }
      }, 800 + Math.random() * 2000);

      intervals.push(interval);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <header className="neon-header">
      <div className="neon-sign">
        <div className="sign-bracket left" />
        <h1 className="neon-text">
          <span className="neon-word warm">W</span>
          <span className="neon-word warm">e</span>
          <span className="neon-word warm neon-flicker">l</span>
          <span className="neon-word warm">c</span>
          <span className="neon-word warm">o</span>
          <span className="neon-word warm neon-flicker">m</span>
          <span className="neon-word warm">e</span>
          <span className="neon-space" />
          <span className="neon-word warm dim">t</span>
          <span className="neon-word warm">o</span>
          <span className="neon-space" />
          <span className="neon-word accent">O</span>
          <span className="neon-word accent neon-flicker" ref={flickerRef}>r</span>
          <span className="neon-word accent">i</span>
          <span className="neon-word accent">o</span>
          <span className="neon-word accent neon-flicker">n</span>
          <span className="neon-word accent">'</span>
          <span className="neon-word accent">s</span>
          <span className="neon-space" />
          <span className="neon-word hot">W</span>
          <span className="neon-word hot neon-flicker">a</span>
          <span className="neon-word hot">s</span>
          <span className="neon-word hot">t</span>
          <span className="neon-word hot weak">e</span>
          <span className="neon-word hot">l</span>
          <span className="neon-word hot">a</span>
          <span className="neon-word hot neon-flicker">n</span>
          <span className="neon-word hot">d</span>
        </h1>
        <div className="sign-bracket right" />
      </div>
      <div className="sign-support left-support" />
      <div className="sign-support right-support" />
    </header>
  );
}
