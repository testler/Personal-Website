import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav>
        <Link id="li" to="/">Home</Link>
        <Link id="li" to="/about">About</Link>
        <Link id="li" to="/projects">Projects</Link>
        <Link id="li" to="/resume">Resume</Link>
        <Link id="li" to="/skills">Skills</Link>
        <Link id="li" to="/contactMe">Contact Me</Link>
        <Link id="li" to="/personal">Personal Life</Link>
    </nav>
  )
}

export default NavBar