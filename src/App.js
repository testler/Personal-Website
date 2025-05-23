import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import SchemaMarkup from './components/SchemaMarkup/SchemaMarkup';
import SkipLink from './components/SkipLink/SkipLink';
import profileImg from './assets/profile.webp';

// Lazy load components
const Home = lazy(() => import('./pages/Home/Home'));
const About = lazy(() => import('./pages/About/About'));
const Projects = lazy(() => import('./pages/Projects/Projects'));
const Resume = lazy(() => import('./pages/Resume/Resume'));
const Contactme = lazy(() => import('./pages/ContactMe/Contactme'));

// Loading component
const LoadingFallback = () => (
  <div className="loading">Loading...</div>
);

function App() {
  return (
    <div className="app">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Joshua Garst's Portfolio</title>
        <meta name="description" content="Joshua Garst's Portfolio - Software Developer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Resource Hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload Critical Assets */}
        <link 
          rel="preload" 
          href={profileImg} 
          as="image" 
          type="image/webp"
          fetchpriority="high"
        />
        <link 
          rel="preload" 
          href="/static/css/main.css" 
          as="style"
        />
        <link 
          rel="preload" 
          href="/static/js/main.js" 
          as="script"
        />
        
        {/* Prefetch Next Route */}
        <link 
          rel="prefetch" 
          href="/projects"
        />
        
        {/* Meta Tags */}
        <meta property="og:title" content="Joshua Garst's Portfolio" />
        <meta property="og:description" content="Software Developer Portfolio" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Joshua Garst's Portfolio" />
        <meta name="twitter:description" content="Software Developer Portfolio" />
      </Helmet>
      <SchemaMarkup />
      <SkipLink />
      <NavBar />
      <main>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contactMe" element={<Contactme />} />
          </Routes>
        </Suspense>
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Joshua Garst. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
