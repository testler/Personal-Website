import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import SchemaMarkup from './components/SchemaMarkup/SchemaMarkup';
import SkipLink from './components/SkipLink/SkipLink';
import ROUTES_CONFIG from './content/routes.config';
import { useAudio } from './features/audio/AudioProvider';
import { VisitTrackerProvider } from './features/tracking/VisitTrackerProvider';

const SITE_URL = 'https://joshua-garst-portfolio-website.netlify.app';

const Home = lazy(() => import('./pages/Home/Home'));
const PassageScene = lazy(() => import('./features/passages/PassageScene'));

function LoadingFallback() {
  return <div className="loading">Loading...</div>;
}

function AppContent() {
  const { enabled: musicEnabled, toggle: toggleMusic } = useAudio();
  const location = useLocation();
  const canonicalUrl = `${SITE_URL}${location.pathname === '/' ? '' : location.pathname}`;

  return (
    <div className="app">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Joshua Garst | Full-Stack Software Engineer — Interactive Portfolio</title>
        <meta
          name="description"
          content="Joshua Garst is a full-stack .NET software engineer with 3+ years experience in enterprise CRM, Azure, C#, and JavaScript. Explore his interactive graphic-novel portfolio."
        />
        <meta name="author" content="Joshua Garst" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Joshua Garst Portfolio" />
        <meta property="og:title" content="Joshua Garst | Full-Stack Software Engineer" />
        <meta
          property="og:description"
          content="An immersive graphic-novel portfolio showcasing full-stack engineering, projects, and career — built with React and Three.js."
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${SITE_URL}/og-preview.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Joshua Garst | Full-Stack Software Engineer" />
        <meta
          name="twitter:description"
          content="An immersive graphic-novel portfolio showcasing full-stack engineering, projects, and career."
        />
        <meta name="twitter:image" content={`${SITE_URL}/og-preview.jpg`} />
      </Helmet>

      <SchemaMarkup />
      <SkipLink />

      <button
        type="button"
        className={`global-audio-toggle ${musicEnabled ? 'is-on' : 'is-off'}`}
        onClick={toggleMusic}
        aria-label={musicEnabled ? 'Mute site audio' : 'Enable site audio'}
      >
        {musicEnabled ? (
          <svg className="global-audio-toggle-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 10v4h4l5 4V6L8 10H4z" />
            <path d="M16 9a5 5 0 0 1 0 6" />
            <path d="M19 6a9 9 0 0 1 0 12" />
          </svg>
        ) : (
          <svg className="global-audio-toggle-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 10v4h4l5 4V6L8 10H4z" />
            <path d="M16 8l5 8" />
            <path d="M21 8l-5 8" />
          </svg>
        )}
      </button>

      <main className="app-main">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* All passage routes via parameterized slug */}
            <Route path="/:passageSlug" element={<PassageScene />} />

            {/* Legacy chapter URL redirects */}
            {ROUTES_CONFIG.redirects.map((r) => (
              <Route key={r.from} path={r.from} element={<Navigate to={r.to} replace />} />
            ))}
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <VisitTrackerProvider>
      <AppContent />
    </VisitTrackerProvider>
  );
}
