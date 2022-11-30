import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import './App.css';
import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Resume from './pages/Resume/Resume';
import Projects from './pages/Projects/Projects';
import About from './pages/About/About';
import Contactme from './pages/ContactMe/Contactme';

function App() {
    return (
    <div>
      <Helmet
        title="Joshua Garst's Portfolio"
        link={[
              {"rel": "icon", 
              }
             ]}
/>
      <NavBar className="navbar"></NavBar>
      <Outlet></Outlet>
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />} />
            <Route path="resume" element={<Resume />} />
            <Route path="contactMe" element={<Contactme />} />
          <Route path="*" element={<Home />} />
          <Route path="**" element={<Home />} />
        </Routes>
    </div>
    );
  
}

export default App;
