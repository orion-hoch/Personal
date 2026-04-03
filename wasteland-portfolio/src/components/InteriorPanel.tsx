import { useEffect, useState, useCallback, useRef } from 'react';
import { interiorContent } from '../data/content';
import type { DialogueOption } from '../data/content';
import './InteriorPanel.css';

interface Props {
  buildingId: string | null;
  onClose: () => void;
}

export default function InteriorPanel({ buildingId, onClose }: Props) {
  const [visible, setVisible] = useState(false);
  const [typedText, setTypedText] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [typingDone, setTypingDone] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const timerRef = useRef<number>(0);

  const content = buildingId ? interiorContent[buildingId] : null;

  // Reset and start typing on open
  useEffect(() => {
    if (buildingId && content) {
      setVisible(true);
      setTypedText([]);
      setCurrentLine(0);
      setCurrentChar(0);
      setTypingDone(false);
      setShowOptions(false);
    } else {
      setVisible(false);
      setShowOptions(false);
    }
  }, [buildingId, content]);

  // Typewriter effect for description
  useEffect(() => {
    if (!content || !visible || typingDone) return;

    const lines = content.description;
    if (currentLine >= lines.length) {
      setTypingDone(true);
      setTimeout(() => setShowOptions(true), 200);
      return;
    }

    const line = lines[currentLine];
    if (line === '') {
      // Empty line — just add it
      setTypedText((prev) => [...prev, '']);
      setCurrentLine((l) => l + 1);
      setCurrentChar(0);
      return;
    }

    if (currentChar >= line.length) {
      setTypedText((prev) => [...prev, line]);
      setCurrentLine((l) => l + 1);
      setCurrentChar(0);
      return;
    }

    const speed = line[currentChar] === ' ' ? 8 : line[currentChar] === '.' ? 60 : 16;
    timerRef.current = window.setTimeout(() => {
      setCurrentChar((c) => c + 1);
    }, speed);

    return () => clearTimeout(timerRef.current);
  }, [content, visible, typingDone, currentLine, currentChar]);

  // Skip typing
  const skipTyping = useCallback(() => {
    if (!content || typingDone) return;
    setTypedText(content.description);
    setCurrentLine(content.description.length);
    setTypingDone(true);
    setShowOptions(true);
  }, [content, typingDone]);

  // Handle dialogue option click
  const handleOption = useCallback((opt: DialogueOption) => {
    if (opt.action === 'close') {
      onClose();
    } else if (opt.external || opt.action.startsWith('http') || opt.action.startsWith('mailto:')) {
      window.open(opt.action, '_blank', 'noopener');
    } else {
      // Internal navigation — for now just log
      console.log('Navigate to:', opt.action);
    }
  }, [onClose]);

  // ESC to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!buildingId || !content) return null;

  const currentLineText = content.description[currentLine] || '';
  const partialLine = currentLineText.slice(0, currentChar);

  return (
    <div className={`interior-backdrop ${visible ? 'open' : ''}`}>
      <div className={`interior-frame ${visible ? 'open' : ''}`} onClick={skipTyping}>

        {/* Top metal bar with rivets */}
        <div className="frame-bar top-bar">
          <div className="rivet" /><div className="rivet" /><div className="rivet" />
          <span className="frame-title">{content.title}</span>
          <div className="rivet" /><div className="rivet" /><div className="rivet" />
        </div>

        <div className="interior-body">

          {/* Left side — vacuum tubes */}
          <div className="tube-column left-tubes">
            <div className="vacuum-tube lit" />
            <div className="vacuum-tube" />
            <div className="vacuum-tube lit" />
            <div className="vacuum-tube" />
          </div>

          {/* Main content area */}
          <div className="interior-main">

            {/* Viewport — the "talking head" screen */}
            <div className="viewport-frame">
              <div className="viewport-screen">
                {content.viewportImage ? (
                  <img
                    src={content.viewportImage}
                    alt={content.viewportLabel || ''}
                    className="viewport-image"
                  />
                ) : (
                  <div className="viewport-placeholder">
                    <div className="viewport-static" />
                    <span className="viewport-text">{content.viewportLabel || '???'}</span>
                  </div>
                )}
                {/* CRT curvature overlay */}
                <div className="viewport-crt" />
                <div className="viewport-scanlines" />
              </div>
              {/* Screen frame bolts */}
              <div className="screen-bolt top-left" />
              <div className="screen-bolt top-right" />
              <div className="screen-bolt bottom-left" />
              <div className="screen-bolt bottom-right" />
            </div>

            {/* Text area — description with typewriter */}
            <div className="text-area">
              <div className="text-content">
                {typedText.map((line, i) => (
                  <p key={i} className="dialogue-line">{line || '\u00A0'}</p>
                ))}
                {!typingDone && (
                  <p className="dialogue-line">
                    {partialLine}
                    <span className="typing-cursor">▊</span>
                  </p>
                )}
              </div>
            </div>

            {/* Dialogue options */}
            <div className={`options-area ${showOptions ? 'visible' : ''}`}>
              {content.dialogueOptions.map((opt, i) => (
                <button
                  key={i}
                  className={`dialogue-option ${opt.action === 'close' ? 'exit-option' : ''}`}
                  onClick={(e) => { e.stopPropagation(); handleOption(opt); }}
                >
                  <span className="option-bullet">●</span>
                  {opt.text}
                </button>
              ))}
            </div>
          </div>

          {/* Right side — vacuum tubes + gauges */}
          <div className="tube-column right-tubes">
            <div className="vacuum-tube" />
            <div className="vacuum-tube lit" />
            <div className="gauge">
              <div className="gauge-needle" />
            </div>
            <div className="vacuum-tube lit" />
          </div>
        </div>

        {/* Bottom nav bar */}
        <div className="frame-bar bottom-bar">
          <button className="nav-btn exit-btn" onClick={(e) => { e.stopPropagation(); onClose(); }}>
            EXIT
          </button>
          {content.navButtons?.map((btn, i) => (
            <button
              key={i}
              className="nav-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (btn.external || btn.action.startsWith('http')) {
                  window.open(btn.action, '_blank', 'noopener');
                }
              }}
            >
              {btn.label}
            </button>
          ))}
          <div className="bottom-spacer" />
          <div className="status-display">
            <span className="status-label">STATUS:</span>
            <span className="status-value">OPERATIONAL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
