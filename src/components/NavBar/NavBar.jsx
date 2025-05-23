import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const location = useLocation();
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link className={`navbar-link${location.pathname === '/' ? ' active' : ''}`} to="/">
          Home
        </Link>
        <Link className={`navbar-link${location.pathname === '/about' ? ' active' : ''}`} to="/about">
          About
        </Link>
        <Link className={`navbar-link${location.pathname === '/projects' ? ' active' : ''}`} to="/projects">
          Projects
        </Link>
        <Link className={`navbar-link${location.pathname === '/resume' ? ' active' : ''}`} to="/resume">
          Resume
        </Link>
        <Link className={`navbar-link${location.pathname === '/contactMe' ? ' active' : ''}`} to="/contactMe">
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
