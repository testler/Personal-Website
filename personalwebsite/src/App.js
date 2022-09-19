import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Personal from './pages/Personal/Personal';
import Resume from './pages/Resume/Resume';
import Projects from './pages/Projects/Projects';
import Skills from './pages/Skills/Skills';
import About from './pages/About/About';
import Contactme from './pages/ContactMe/Contactme';

function App() {
    return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />} />
            <Route path="personal" element={<Personal />} />
            <Route path="resume" element={<Resume />} />
            <Route path="skills" element={<Skills />} />
            <Route path="contactMe" element={<Contactme />} />
        </Routes>
    </div>
    );
  
}

export default App;
