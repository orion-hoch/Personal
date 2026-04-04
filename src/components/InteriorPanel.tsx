import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { interiorContent } from '../data/content';
import type { ContactItem, ContentTab, PortfolioItem, SkillGroup } from '../data/content';
import type { VisualizationSequenceId } from '../data/visualizationSequences';
import './InteriorPanel.css';

interface Props {
  buildingId: string | null;
  onClose: () => void;
  onOpenVisualization?: (sequenceId: VisualizationSequenceId) => void;
}

function openHref(href: string, external?: boolean) {
  if (external || href.startsWith('http') || href.startsWith('mailto:')) {
    window.open(href, '_blank', 'noopener');
    return;
  }

  window.location.href = href;
}

function MediaPlate({ src, label, className = '' }: { src?: string; label: string; className?: string }) {
  return (
    <div className={`media-plate ${className}`.trim()}>
      {src ? <img src={src} alt={label} className="media-plate__image" loading="lazy" decoding="async" /> : <span className="media-plate__label">{label}</span>}
    </div>
  );
}

function AboutPhotoToggle({ tab }: { tab: ContentTab }) {
  const hasAlternate = Boolean(tab.alternatePhoto);
  const [showAlternate, setShowAlternate] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const swapTimerRef = useRef<number | null>(null);
  const settleTimerRef = useRef<number | null>(null);

  const currentPhoto = showAlternate && tab.alternatePhoto ? tab.alternatePhoto : tab.photo;
  const currentLabel = showAlternate && tab.alternatePhotoLabel ? tab.alternatePhotoLabel : (tab.photoLabel || 'Portrait');

  useEffect(() => {
    return () => {
      if (swapTimerRef.current) window.clearTimeout(swapTimerRef.current);
      if (settleTimerRef.current) window.clearTimeout(settleTimerRef.current);
    };
  }, []);

  const handleToggle = () => {
    if (transitioning) return;

    setTransitioning(true);

    if (swapTimerRef.current) window.clearTimeout(swapTimerRef.current);
    if (settleTimerRef.current) window.clearTimeout(settleTimerRef.current);

    swapTimerRef.current = window.setTimeout(() => {
      setShowAlternate((value) => !value);
    }, 140);

    settleTimerRef.current = window.setTimeout(() => {
      setTransitioning(false);
    }, 420);
  };

  return (
    <div className="profile-layout__photo-wrap">
      <MediaPlate src={currentPhoto} label={currentLabel} className={`profile-layout__photo ${transitioning ? 'profile-layout__photo--transitioning' : ''}`} />
      {hasAlternate && (
        <button
          className="portfolio-action-button profile-layout__photo-toggle"
          onClick={handleToggle}
        >
          {showAlternate
            ? (tab.primaryPhotoButtonLabel || 'Show Headshot')
            : (tab.alternatePhotoButtonLabel || 'Show Casual Photo')}
        </button>
      )}
    </div>
  );
}

function PortfolioRow({ item }: { item: PortfolioItem }) {
  return (
    <article className="portfolio-row">
      <MediaPlate src={item.image} label={item.imageLabel} className="portfolio-row__media" />
      <div className="portfolio-row__body">
        <div className="portfolio-row__header">
          <div className="portfolio-row__header-main">
            <h4>{item.title}</h4>
            {item.organization && (
              item.organizationHref ? (
                <button
                  className="portfolio-row__organization portfolio-row__organization--link"
                  onClick={() => openHref(item.organizationHref!, item.organizationExternal)}
                >
                  {item.organization}
                </button>
              ) : (
                <div className="portfolio-row__organization">{item.organization}</div>
              )
            )}
          </div>
          {(item.dates || item.href) && (
            <div className="portfolio-row__header-side">
              {item.dates && <div className="portfolio-row__dates">{item.dates}</div>}
              {item.href && (
                <button className="portfolio-inline-link" onClick={() => openHref(item.href!, item.external)}>
                  Open
                </button>
              )}
            </div>
          )}
        </div>
        <p>{item.description}</p>
        <div className="portfolio-row__skills">
          {item.skills.map((skill) => (
            <span key={skill} className="portfolio-chip">{skill}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

function ContactRow({ item }: { item: ContactItem }) {
  return (
    <article className="contact-card">
      <span className="contact-card__label">{item.label}</span>
      {item.href ? (
        <button className="portfolio-inline-link" onClick={() => openHref(item.href!)}>
          {item.value}
        </button>
      ) : (
        <span className="contact-card__value">{item.value}</span>
      )}
    </article>
  );
}

function SkillGroupCard({ group }: { group: SkillGroup }) {
  return (
    <article className="skill-group-card">
      <div className="skill-group-card__title">{group.title}</div>
      <div className="skill-group-card__list">
        {group.items.map((item) => (
          <span key={item} className="portfolio-chip">{item}</span>
        ))}
      </div>
    </article>
  );
}

function renderTab(tab: ContentTab, onOpenVisualization?: (sequenceId: VisualizationSequenceId) => void) {
  if (tab.layout === 'about') {
    return (
      <section className="portfolio-panel portfolio-panel--about">
        <div className="profile-layout">
          <AboutPhotoToggle tab={tab} />
          <section className="profile-layout__intro">
            {tab.intro && <p className="portfolio-panel__intro">{tab.intro}</p>}
            <div className="profile-layout__bio">
              {tab.bio?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        </div>

        {tab.skillGroups && (
          <section className="skills-section">
            <div className="section-tag">Resume Skills</div>
            <div className="skills-grid">
              {tab.skillGroups.map((group) => <SkillGroupCard key={group.title} group={group} />)}
            </div>
          </section>
        )}
      </section>
    );
  }

  if (tab.layout === 'contacts') {
    return (
      <section className="portfolio-panel">
        {tab.intro && <p className="portfolio-panel__intro">{tab.intro}</p>}
        <div className="contact-grid">
          {tab.contacts?.map((item) => <ContactRow key={`${item.label}-${item.value}`} item={item} />)}
        </div>
      </section>
    );
  }

  return (
    <section className="portfolio-panel">
      {tab.headerImageLabel && <MediaPlate src={tab.headerImage} label={tab.headerImageLabel} className="portfolio-header-image" />}
      {(tab.intro || tab.actionHref || tab.visualizationSequenceId) && (
        <div className="portfolio-panel__topline">
          {tab.intro && <p className="portfolio-panel__intro">{tab.intro}</p>}
          <div className="portfolio-panel__actions">
            {tab.visualizationSequenceId && onOpenVisualization && (
              <button
                className="portfolio-action-button"
                onClick={() => onOpenVisualization(tab.visualizationSequenceId!)}
              >
                {tab.visualizationLabel || 'Open 3D Walkthrough'}
              </button>
            )}
            {tab.actionHref && (
              <button
                className="portfolio-action-button"
                onClick={() => openHref(tab.actionHref!, tab.actionExternal)}
              >
                {tab.actionLabel || 'Open'}
              </button>
            )}
          </div>
        </div>
      )}
      <div className="portfolio-list">
        {tab.items?.map((item) => <PortfolioRow key={item.title} item={item} />)}
      </div>
      {tab.secondaryItems && tab.secondaryItems.length > 0 && (
        <>
          <div className="portfolio-section-divider" aria-hidden />
          <section className="portfolio-subsection">
            {tab.secondaryTitle && <div className="section-tag">{tab.secondaryTitle}</div>}
            {tab.secondaryIntro && <p className="portfolio-panel__intro">{tab.secondaryIntro}</p>}
            <div className="portfolio-list">
              {tab.secondaryItems.map((item) => <PortfolioRow key={item.title} item={item} />)}
            </div>
          </section>
        </>
      )}
    </section>
  );
}

export default function InteriorPanel({ buildingId, onClose, onOpenVisualization }: Props) {
  const content = buildingId ? interiorContent[buildingId] : null;
  const visible = Boolean(buildingId && content);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const activeTab = useMemo(() => content?.tabs[0], [content]);

  if (!content || !activeTab) return null;

  const accentStyle = { '--panel-accent': content.accent } as CSSProperties;

  return (
    <div
      className={`interior-backdrop ${visible ? 'open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={`interior-frame ${visible ? 'open' : ''}`} style={accentStyle}>
        <div className="interior-frame__trim" aria-hidden />
        <div className="interior-frame__plate interior-frame__plate--top" aria-hidden />
        <div className="interior-frame__plate interior-frame__plate--right" aria-hidden />

        <header className="portfolio-header">
          <div className="portfolio-header__copy">
            <div className="portfolio-header__kicker">{content.kicker}</div>
            <h2>{content.title}</h2>
          </div>
          <button className="portfolio-close" onClick={onClose}>Close</button>
        </header>

        <div className="portfolio-body">
          <main className="portfolio-main portfolio-main--single">
            {renderTab(activeTab, onOpenVisualization)}
          </main>
        </div>
      </div>
    </div>
  );
}
