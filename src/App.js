import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Projects from './pages/Projects/Projects';
import Resume from './pages/Resume/Resume';
import SchemaMarkup from './components/SchemaMarkup/SchemaMarkup';
import SkipLink from './components/SkipLink/SkipLink';
import Contactme from './pages/ContactMe/Contactme';

function App() {
  return (
    <div className="app">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Joshua Garst's Portfolio</title>
        <meta name="description" content="Joshua Garst's Portfolio - Software Developer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contactMe" element={<Contactme />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Joshua Garst. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
