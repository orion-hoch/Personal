import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { interiorContent } from '../data/content';
import type { ContactItem, ContentTab, PortfolioItem } from '../data/content';
import './InteriorPanel.css';

interface Props {
  buildingId: string | null;
  onClose: () => void;
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
      {src ? <img src={src} alt={label} className="media-plate__image" loading="lazy" /> : <span className="media-plate__label">{label}</span>}
    </div>
  );
}

function PortfolioRow({ item }: { item: PortfolioItem }) {
  const skillsLine = item.skills.join(' / ');

  return (
    <article className="portfolio-row">
      <MediaPlate src={item.image} label={item.imageLabel} className="portfolio-row__media" />
      <div className="portfolio-row__body">
        <h4>{item.title}</h4>
        <p>{item.description}</p>
        <div className="portfolio-row__skills">Skills: {skillsLine}</div>
        {item.href && (
          <button className="portfolio-inline-link" onClick={() => openHref(item.href!, item.external)}>
            Open Project
          </button>
        )}
      </div>
    </article>
  );
}

function ContactRow({ item }: { item: ContactItem }) {
  return (
    <div className="contact-row">
      <span className="contact-row__label">{item.label}</span>
      {item.href ? (
        <button className="portfolio-inline-link" onClick={() => openHref(item.href!)}>
          {item.value}
        </button>
      ) : (
        <span className="contact-row__value">{item.value}</span>
      )}
    </div>
  );
}

function renderTab(tab: ContentTab) {
  if (tab.layout === 'about') {
    return (
      <section className="portfolio-panel portfolio-panel--profile">
        {tab.intro && <p className="portfolio-panel__intro">{tab.intro}</p>}
        <div className="profile-layout">
          <MediaPlate src={tab.photo} label={tab.photoLabel || 'Portrait'} className="profile-layout__photo" />
          <div className="profile-layout__bio">
            {tab.bio?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (tab.layout === 'contacts') {
    return (
      <section className="portfolio-panel">
        {tab.intro && <p className="portfolio-panel__intro">{tab.intro}</p>}
        <div className="contact-list">
          {tab.contacts?.map((item) => <ContactRow key={`${item.label}-${item.value}`} item={item} />)}
        </div>
      </section>
    );
  }

  return (
    <section className="portfolio-panel">
      {tab.headerImageLabel && <MediaPlate src={tab.headerImage} label={tab.headerImageLabel} className="portfolio-header-image" />}
      {tab.intro && <p className="portfolio-panel__intro">{tab.intro}</p>}
      <div className="portfolio-list">
        {tab.items?.map((item) => <PortfolioRow key={item.title} item={item} />)}
      </div>
    </section>
  );
}

export default function InteriorPanel({ buildingId, onClose }: Props) {
  const [visible, setVisible] = useState(false);
  const content = buildingId ? interiorContent[buildingId] : null;
  const [activeTabId, setActiveTabId] = useState('');

  useEffect(() => {
    if (buildingId && content) {
      setVisible(true);
      setActiveTabId(content.tabs[0]?.id ?? '');
    } else {
      setVisible(false);
    }
  }, [buildingId, content]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const activeTab = useMemo(() => content?.tabs.find((tab) => tab.id === activeTabId) ?? content?.tabs[0], [content, activeTabId]);

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
        <header className="portfolio-header">
          <div className="portfolio-header__copy">
            <div className="portfolio-header__kicker">{content.kicker}</div>
            <h2>{content.title}</h2>
          </div>
          <button className="portfolio-close" onClick={onClose}>Close</button>
        </header>

        <div className="portfolio-body">
          <aside className="portfolio-tabs-wrap">
            <div className="portfolio-tabs-wrap__label">Area Index</div>
            <nav className="portfolio-tabs" aria-label="Content tabs">
              {content.tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`portfolio-tab ${tab.id === activeTab.id ? 'active' : ''}`}
                  onClick={() => setActiveTabId(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </aside>

          <main className="portfolio-main">
            <section className="portfolio-main__header">
              <div className="portfolio-tab-hero__eyebrow">{content.title}</div>
              <h3>{activeTab.label}</h3>
            </section>
            {renderTab(activeTab)}
          </main>
        </div>
      </div>
    </div>
  );
}
