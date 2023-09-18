import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import navButton from "./bars-solid.svg";
import "./NavBar.css";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileDevice(window.innerWidth <= 800);
    };

    // Add an event listener for window resizing
    window.addEventListener("resize", handleResize);
    
    // Call handleResize immediately to set the initial value
    handleResize();

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  // Define a function to handle link clicks
  const handleLinkClick = () => {
    if (isMobileDevice) {
      closeNav();
    }
  };

  return (
    <nav className={`nav-menu ${isOpen || !isMobileDevice ? "active" : ""}`}>
      <div className={`nav-bar-bar ${isMobileDevice ? "mobile" : ""}`}>
        {isMobileDevice && (
          <button
            onClick={toggleNav}
            className={`nav-button ${isOpen ? "" : "open"}`}
          >
            <img src={navButton} alt="navigation button" />
          </button>
        )}
      </div>
      <div className={`nav-links ${isOpen ? "active" : ""}`}>
        <Link onClick={handleLinkClick} to="/">
          Home
        </Link>
        <Link onClick={handleLinkClick} to="/about">
          About
        </Link>
        <Link onClick={handleLinkClick} to="/projects">
          Projects
        </Link>
        <Link onClick={handleLinkClick} to="/resume">
          Resume
        </Link>
        <Link onClick={handleLinkClick} to="/contactMe">
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
