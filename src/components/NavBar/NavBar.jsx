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
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
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
          <Link onClick={isMobileDevice ? toggleNav : null} to="/">
            Home
          </Link>
          <Link onClick={isMobileDevice ? toggleNav : null} to="/about">
            About
          </Link>
          <Link onClick={isMobileDevice ? toggleNav : null} to="/projects">
            Projects
          </Link>
          <Link onClick={isMobileDevice ? toggleNav : null} to="/resume">
            Resume
          </Link>
          <Link onClick={isMobileDevice ? toggleNav : null} to="/contactMe">
            Contact
          </Link>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
