import React from 'react';
import PASSAGE_EXTRAS from '../../content/passage-extras.config';

function DownloadPanel({ items, links }) {
  return (
    <div className="passage-extras passage-extras-downloads">
      <div className="passage-extras-row">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            download={item.download}
            className="passage-extras-button"
          >
            {item.label}
          </a>
        ))}
      </div>
      {links && links.length > 0 && (
        <div className="passage-extras-row">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="passage-extras-link"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function ContactPanel({ channels }) {
  return (
    <div className="passage-extras passage-extras-contact">
      {channels.map((ch) => (
        <a
          key={ch.label}
          href={ch.href}
          target={ch.external ? '_blank' : undefined}
          rel={ch.external ? 'noopener noreferrer' : undefined}
          className="passage-extras-channel"
        >
          <span className="passage-extras-channel-label">{ch.label}</span>
          <span className="passage-extras-channel-value">{ch.value}</span>
        </a>
      ))}
    </div>
  );
}

function ProjectShowcase({ image, repo, live }) {
  return (
    <div className="passage-extras passage-extras-project">
      {image && (
        <img
          src={image}
          alt="Project screenshot"
          className="passage-extras-project-img"
          loading="lazy"
        />
      )}
      <div className="passage-extras-project-links">
        {live && (
          <a href={live} target="_blank" rel="noopener noreferrer" className="passage-extras-project-btn passage-extras-project-btn--primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            View Live Site
          </a>
        )}
        {repo && (
          <a href={repo} target="_blank" rel="noopener noreferrer" className="passage-extras-project-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            View Source Code
          </a>
        )}
      </div>
    </div>
  );
}

export default function PassageExtrasRenderer({ passageId }) {
  const extras = PASSAGE_EXTRAS[passageId];
  if (!extras) return null;

  switch (extras.type) {
    case 'downloads':
      return <DownloadPanel items={extras.items} links={extras.links} />;
    case 'contact-links':
      return <ContactPanel channels={extras.channels} />;
    case 'project-showcase':
      return <ProjectShowcase image={extras.image} repo={extras.repo} live={extras.live} />;
    default:
      return null;
  }
}
