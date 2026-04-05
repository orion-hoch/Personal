import { useEffect, useMemo, useRef, useState } from 'react';
import { interiorContent } from '../data/content';
import type { ContactItem, ContentTab, PortfolioItem, SkillGroup } from '../data/content';
import type { VisualizationSequenceId } from '../data/visualizationSequences';
import './InteriorPanel.css';

interface Props {
  buildingId: string | null;
  onClose: () => void;
  onOpenVisualization?: (sequenceId: VisualizationSequenceId, stepId?: string) => void;
}

const SECTION_ORDER = ['about', 'resume', 'projects', 'games', 'contact'] as const;

function openHref(href: string, external?: boolean) {
  if (href.startsWith('mailto:')) {
    window.location.href = href;
    return;
  }

  if (external || href.startsWith('http') || href.startsWith('mailto:')) {
    window.open(href, '_blank', 'noopener');
    return;
  }

  window.location.href = href;
}

async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    document.body.removeChild(textarea);
    return copied;
  }
}

async function copyOrMail(value: string) {
  const copied = await copyText(value);
  if (!copied) {
    window.location.href = `mailto:${value}`;
  }
  return copied;
}

function MediaBox({ src, label, className = '', onClick }: { src?: string; label: string; className?: string; onClick?: () => void }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <button className={`neo-media ${onClick ? 'neo-media--button' : ''} ${className}`.trim()} onClick={onClick}>
      {src && !imageFailed ? (
        <img
          src={src}
          alt={label}
          className="neo-media__img"
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span className="neo-media__label">{label}</span>
      )}
    </button>
  );
}

function AboutPhotoSwitcher({ tab }: { tab: ContentTab }) {
  const hasAlternate = Boolean(tab.alternatePhoto);
  const [showAlternate, setShowAlternate] = useState(false);
  const [switching, setSwitching] = useState(false);
  const swapTimerRef = useRef<number | null>(null);
  const settleTimerRef = useRef<number | null>(null);

  const currentPhoto = showAlternate && tab.alternatePhoto ? tab.alternatePhoto : tab.photo;
  const currentLabel = showAlternate && tab.alternatePhotoLabel ? tab.alternatePhotoLabel : (tab.photoLabel || 'portrait');

  useEffect(() => {
    return () => {
      if (swapTimerRef.current) window.clearTimeout(swapTimerRef.current);
      if (settleTimerRef.current) window.clearTimeout(settleTimerRef.current);
    };
  }, []);

  const handleToggle = () => {
    if (!hasAlternate || switching) return;

    setSwitching(true);
    if (swapTimerRef.current) window.clearTimeout(swapTimerRef.current);
    if (settleTimerRef.current) window.clearTimeout(settleTimerRef.current);

    swapTimerRef.current = window.setTimeout(() => {
      setShowAlternate((value) => !value);
    }, 120);

    settleTimerRef.current = window.setTimeout(() => {
      setSwitching(false);
    }, 420);
  };

  return (
    <div className="neo-photo-switcher">
      <MediaBox src={currentPhoto} label={currentLabel} className={`neo-photo ${switching ? 'neo-photo--switching' : ''}`} />
      {hasAlternate && (
        <button className="neo-text-link" onClick={handleToggle}>
          {showAlternate
            ? (tab.primaryPhotoButtonLabel || 'show headshot')
            : (tab.alternatePhotoButtonLabel || 'show casual photo')}
        </button>
      )}
    </div>
  );
}

function PortfolioEntry({ item, onOpenVisualization }: { item: PortfolioItem; onOpenVisualization?: () => void }) {
  return (
    <article className="neo-entry">
      <MediaBox src={item.image} label={item.imageLabel} className="neo-entry__media" onClick={onOpenVisualization} />
      <div className="neo-entry__body">
        <div className="neo-entry__title">{item.title}</div>
        {(item.organization || item.dates) && (
          <div className="neo-entry__meta">
            {item.organization && (
              item.organizationHref ? (
                <button className="neo-text-link neo-text-link--inline" onClick={() => openHref(item.organizationHref!, item.organizationExternal)}>
                  {item.organization}
                </button>
              ) : (
                <span>{item.organization}</span>
              )
            )}
            {item.dates && <span>{item.dates}</span>}
          </div>
        )}
        <p className="neo-copy neo-copy--compact">{item.description}</p>
        {item.skills.length > 0 && (
          <div className="neo-tag-row">
            {item.skills.map((skill) => <span key={skill} className="neo-tag">{skill}</span>)}
          </div>
        )}
        {item.href && (
          <button className="neo-text-link" onClick={() => openHref(item.href!, item.external)}>
            open transmission
          </button>
        )}
      </div>
    </article>
  );
}

function ContactSignal({ item }: { item: ContactItem }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyOrMail(item.value);
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="neo-signal-row">
      <span className="neo-signal-row__label">{item.label}</span>
      {item.href && !item.href.startsWith('mailto:') ? (
        <button className="neo-text-link neo-text-link--inline" onClick={() => openHref(item.href!)}>{item.value}</button>
      ) : item.href?.startsWith('mailto:') ? (
        <button className="neo-text-link neo-text-link--inline" onClick={handleCopy}>
          {copied ? `${item.value} copied` : item.value}
        </button>
      ) : (
        <span className="neo-copy neo-copy--compact">{item.value}</span>
      )}
    </div>
  );
}

function SkillBlock({ group }: { group: SkillGroup }) {
  return (
    <section className="neo-skill-block">
      <div className="neo-minihead">{group.title}</div>
      <div className="neo-tag-row">
        {group.items.map((item) => <span key={item} className="neo-tag">{item}</span>)}
      </div>
    </section>
  );
}

function renderPage(
  sectionId: string,
  tab: ContentTab,
  onOpenVisualization?: (sequenceId: VisualizationSequenceId, stepId?: string) => void,
) {
  if (tab.layout === 'about') {
    return (
      <>
        <section className="neo-feature">
          <AboutPhotoSwitcher tab={tab} />
          <div className="neo-feature__body">
            {tab.intro && <div className="neo-status">{tab.intro}</div>}
            {tab.bio?.map((paragraph) => <p key={paragraph} className="neo-copy">{paragraph}</p>)}
          </div>
        </section>

        {tab.skillGroups && tab.skillGroups.length > 0 && (
          <>
            <div className="neo-divider">resume skills</div>
            <div className="neo-skill-grid">
              {tab.skillGroups.map((group) => <SkillBlock key={group.title} group={group} />)}
            </div>
          </>
        )}
      </>
    );
  }

  if (tab.layout === 'contacts') {
    return (
      <>
        {tab.headerImage && <MediaBox src={tab.headerImage} label={tab.headerImageLabel || 'header image'} className="neo-header-media" />}
        {tab.intro && <div className="neo-status">{tab.intro}</div>}
        <div className="neo-divider">entries</div>
        <div className="neo-signal-board">
          {tab.contacts?.map((item) => <ContactSignal key={`${item.label}-${item.value}`} item={item} />)}
        </div>
      </>
    );
  }

  return (
    <>
      {tab.headerImage && <MediaBox src={tab.headerImage} label={tab.headerImageLabel || 'header image'} className="neo-header-media" />}
      {tab.intro && <div className="neo-status">{tab.intro}</div>}

      {(tab.visualizationSequenceId || tab.actionHref) && (
        <div className="neo-action-row">
          {tab.visualizationSequenceId && onOpenVisualization && (
            <div className="neo-walkthrough-callout">
              <button className="neo-walkthrough-link" onClick={() => onOpenVisualization(tab.visualizationSequenceId!)}>
                {tab.visualizationLabel || 'open personal walkthrough'}
              </button>
              <p className="neo-copy neo-copy--compact">A guided 3D route through these projects with staged props, camera beats, and detail popups.</p>
            </div>
          )}
          {tab.actionHref && (
            <button className="neo-action-button" onClick={() => openHref(tab.actionHref!, tab.actionExternal)}>
              {tab.actionLabel || 'open'}
            </button>
          )}
        </div>
      )}

      <div className="neo-divider">entries</div>
      <div className="neo-entry-list">
        {tab.items?.map((item) => (
          <PortfolioEntry
            key={`${sectionId}-${item.title}`}
            item={item}
            onOpenVisualization={tab.visualizationSequenceId && item.visualizationStepId && onOpenVisualization
              ? () => onOpenVisualization(tab.visualizationSequenceId!, item.visualizationStepId)
              : undefined}
          />
        ))}
      </div>

      {tab.secondaryItems && tab.secondaryItems.length > 0 && (
        <>
          <div className="neo-divider">{tab.secondaryTitle || 'additional work'}</div>
          {tab.secondaryIntro && <div className="neo-status">{tab.secondaryIntro}</div>}
          <div className="neo-entry-list">
            {tab.secondaryItems.map((item) => <PortfolioEntry key={`${sectionId}-${item.title}`} item={item} />)}
          </div>
        </>
      )}
    </>
  );
}

export default function InteriorPanel({ buildingId, onClose, onOpenVisualization }: Props) {
  const [currentSectionId, setCurrentSectionId] = useState(buildingId ?? 'about');

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const currentContent = interiorContent[currentSectionId] ?? (buildingId ? interiorContent[buildingId] : null);
  const activeTab = useMemo(() => currentContent?.tabs[0], [currentContent]);

  if (!buildingId || !currentContent || !activeTab) return null;

  return (
    <div className="neo-backdrop" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="neo-blackbox">
        <div className="neo-overlay neo-overlay--noise" />
        <div className="neo-overlay neo-overlay--vignette" />

        <header className="neo-header">
          <div className="neo-header__title">{currentContent.title}</div>
          <div className="neo-header__sub">cataloging Orion's junk since 2005</div>
          <button className="neo-close" onClick={onClose}>return to hub</button>
        </header>

        <div className="neo-layout">
          <aside className="neo-sidebar neo-sidebar--left">
            <div className="neo-sidebox">
              <div className="neo-radio-track">currently viewing / {currentContent.title.toLowerCase()}</div>
            </div>

            <div className="neo-sidebox">
              <div className="neo-sidebar__label">navigate</div>
              <nav className="neo-nav">
                {SECTION_ORDER.map((sectionId) => (
                  <button
                    key={sectionId}
                    className={`neo-nav__item ${sectionId === currentSectionId ? 'active' : ''}`}
                    onClick={() => setCurrentSectionId(sectionId)}
                  >
                    {interiorContent[sectionId].title.toLowerCase()}
                  </button>
                ))}
              </nav>
            </div>

            <div className="neo-sidebox">
              <div className="neo-sidebar__label">status</div>
              <div className="neo-smallcopy">updated 20260404</div>
            </div>
          </aside>

          <main className="neo-main">
            {renderPage(currentSectionId, activeTab, onOpenVisualization)}
          </main>
        </div>

        <footer className="neo-footer">page © wasteland.terminal — still transmitting — est. 2026</footer>
      </div>
    </div>
  );
}
