import { useEffect, useMemo, useState } from 'react';
import { interiorContent } from '../data/content';
import type { InteriorContent, PageAction, PageCard, PageSection } from '../data/content';
import './InteriorPanel.css';

interface Props {
  buildingId: string | null;
  onClose: () => void;
}

function handleAction(action: PageAction | PageCard) {
  const href = action.href;
  if (!href) return;

  if (href.startsWith('mailto:') || action.external || href.startsWith('http') || href.startsWith('/')) {
    window.open(href, action.external || href.startsWith('http') || href.startsWith('mailto:') ? '_blank' : '_self', 'noopener');
    return;
  }

  window.location.href = href;
}

function renderSection(section: PageSection) {
  return (
    <section key={section.title} className="portfolio-section">
      <div className="portfolio-section__header">
        <h3>{section.title}</h3>
        {section.description && <p>{section.description}</p>}
      </div>

      {section.paragraphs && (
        <div className="portfolio-copy">
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      )}

      {section.metrics && (
        <div className="portfolio-metrics">
          {section.metrics.map((metric) => (
            <article key={`${metric.label}-${metric.value}`} className="portfolio-metric-card">
              <span className="portfolio-metric-card__label">{metric.label}</span>
              <strong>{metric.value}</strong>
            </article>
          ))}
        </div>
      )}

      {section.bullets && (
        <ul className="portfolio-bullets">
          {section.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}

      {section.cards && (
        <div className="portfolio-card-grid">
          {section.cards.map((card) => (
            <article key={card.title} className="portfolio-card">
              <div className="portfolio-card__eyebrow">{card.eyebrow || 'Section'}</div>
              <h4>{card.title}</h4>
              <p>{card.description}</p>
              {card.meta && <div className="portfolio-card__meta">{card.meta}</div>}
              {card.href && (
                <button className="portfolio-card__link" onClick={() => handleAction(card)}>
                  {card.ctaLabel || 'Open'}
                </button>
              )}
            </article>
          ))}
        </div>
      )}

      {section.timeline && (
        <div className="portfolio-timeline">
          {section.timeline.map((item) => (
            <article key={`${item.period}-${item.title}`} className="portfolio-timeline__item">
              <div className="portfolio-timeline__period">{item.period}</div>
              <div className="portfolio-timeline__body">
                <h4>{item.title}</h4>
                {item.subtitle && <div className="portfolio-timeline__subtitle">{item.subtitle}</div>}
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default function InteriorPanel({ buildingId, onClose }: Props) {
  const [visible, setVisible] = useState(false);
  const content = buildingId ? interiorContent[buildingId] : null;

  const firstTabId = content?.tabs[0]?.id ?? '';
  const [activeTabId, setActiveTabId] = useState(firstTabId);

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

  if (!buildingId || !content || !activeTab) return null;

  const accentStyle = { '--panel-accent': content.accent } as React.CSSProperties;

  return (
    <div
      className={`interior-backdrop ${visible ? 'open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={`interior-frame ${visible ? 'open' : ''}`} style={accentStyle}>
        <header className="portfolio-header">
          <div>
            <div className="portfolio-header__kicker">{content.kicker}</div>
            <h2>{content.title}</h2>
            <p>{content.intro}</p>
          </div>
          <button className="portfolio-close" onClick={onClose}>Close</button>
        </header>

        <div className="portfolio-layout">
          <aside className="portfolio-sidebar">
            <section className="portfolio-hero-card">
              <span className="portfolio-hero-card__label">Selected destination</span>
              <h3>{content.title}</h3>
              <p>{content.intro}</p>
            </section>

            {content.stats && (
              <section className="portfolio-sidebar-block">
                <div className="portfolio-sidebar-block__title">Snapshot</div>
                <div className="portfolio-sidebar-metrics">
                  {content.stats.map((stat) => (
                    <div key={`${stat.label}-${stat.value}`} className="portfolio-sidebar-metric">
                      <span>{stat.label}</span>
                      <strong>{stat.value}</strong>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="portfolio-sidebar-block">
              <div className="portfolio-sidebar-block__title">Links</div>
              <div className="portfolio-actions">
                {content.actions.map((action) => (
                  <button
                    key={`${action.label}-${action.href}`}
                    className={`portfolio-action portfolio-action--${action.variant || 'secondary'}`}
                    onClick={() => handleAction(action)}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </section>
          </aside>

          <main className="portfolio-main">
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

            <div className="portfolio-content">
              <section className="portfolio-tab-hero">
                <span className="portfolio-tab-hero__eyebrow">{content.title}</span>
                <h3>{activeTab.label}</h3>
                {activeTab.intro && <p>{activeTab.intro}</p>}
              </section>

              {activeTab.sections.map((section) => renderSection(section))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
