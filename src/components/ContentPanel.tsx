import { useEffect, useState, useRef, useCallback } from 'react';
import { interiorContent } from '../data/content';
import './ContentPanel.css';

interface Props {
  section: string | null;
  onClose: () => void;
}

export default function ContentPanel({ section, onClose }: Props) {
  const [visible, setVisible] = useState(false);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [typingDone, setTypingDone] = useState(false);
  const intervalRef = useRef<number>(0);
  const panelRef = useRef<HTMLDivElement>(null);

  const content = section ? interiorContent[section] : null;

  // Open animation
  useEffect(() => {
    if (section) {
      setVisible(true);
      setDisplayedLines([]);
      setCurrentCharIndex(0);
      setCurrentLineIndex(0);
      setTypingDone(false);
    } else {
      setVisible(false);
    }
  }, [section]);

  // Typewriter effect
  useEffect(() => {
    if (!content || !visible) return;

    const lines = content.description;
    if (currentLineIndex >= lines.length) {
      setTypingDone(true);
      return;
    }

    const currentLine = lines[currentLineIndex];
    if (currentCharIndex >= currentLine.length) {
      // Move to next line
      setDisplayedLines((prev) => [...prev, currentLine]);
      setCurrentLineIndex((i) => i + 1);
      setCurrentCharIndex(0);
      return;
    }

    const speed = currentLine[currentCharIndex] === ' ' ? 10 : 18;
    intervalRef.current = window.setTimeout(() => {
      setCurrentCharIndex((c) => c + 1);
    }, speed);

    return () => clearTimeout(intervalRef.current);
  }, [content, visible, currentLineIndex, currentCharIndex]);

  // Skip typing on click
  const skipTyping = useCallback(() => {
    if (!content || typingDone) return;
    setDisplayedLines(content.description);
    setCurrentLineIndex(content.description.length);
    setTypingDone(true);
  }, [content, typingDone]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Close on outside click
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  if (!section || !content) return null;

  const currentLine = content.description[currentLineIndex] || '';
  const partialLine = currentLine.slice(0, currentCharIndex);

  return (
    <div
      className={`panel-backdrop ${visible ? 'open' : ''}`}
      onClick={handleBackdropClick}
    >
      <div
        ref={panelRef}
        className={`content-panel ${visible ? 'open' : ''}`}
        onClick={skipTyping}
      >
        {/* CRT overlay */}
        <div className="crt-overlay" />
        <div className="scanlines" />

        {/* Header */}
        <div className="panel-header">
          <span className="panel-title">{content.title}</span>
          <button className="panel-close" onClick={(e) => { e.stopPropagation(); onClose(); }}>
            [X] EXIT
          </button>
        </div>

        {/* Content */}
        <div className="panel-content">
          {displayedLines.map((line, i) => (
            <div key={i} className="terminal-line">{line || '\u00A0'}</div>
          ))}
          {!typingDone && (
            <div className="terminal-line">
              {partialLine}
              <span className="cursor">█</span>
            </div>
          )}
          {typingDone && (
            <div className="terminal-line">
              <span className="cursor blink">█</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="panel-footer">
          <span>ESC to close</span>
          <span>Click to skip</span>
        </div>
      </div>
    </div>
  );
}
