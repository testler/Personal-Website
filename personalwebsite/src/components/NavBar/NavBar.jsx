import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "./NavBar.css"
const NavBar = () => {
  return (
    <nav>
        <Link id="li" to="/">    home   </Link>
        <Link id="li" to="/about">    about   </Link>
        <Link id="li" to="/projects">   projects   </Link>
        <Link id="li" to="/personal">  personal Life   </Link>
        <Link id="li" to="/resume">    resume   </Link>
        <Link id="li" to="/skills">   Skills    </Link>
        <Link id="li" to="/contactMe">    Contact Me    </Link>
    </nav>
  )
}

export default NavBar