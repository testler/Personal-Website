import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "./NavBar.css";
import homeImg from "./faciocon.png"

const NavBar = () => {
  return (
    <nav>
        <Link id="li" to="/"><img className='home-button' src={homeImg} alt="home button" /></Link>
        <Link id="li" to="/about">About</Link>
        <Link id="li" to="/projects">Projects</Link>
        <Link id="li" to="/resume">Resume</Link>
        <Link id="li" to="/contactMe">Contact Me</Link>
    </nav>
  )
}

export default NavBar