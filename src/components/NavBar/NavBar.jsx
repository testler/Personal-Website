import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import homeImg from "./faciocon.png";
import navBtn from "./humburger.png"
import logo from "./logo1.png"
  
const NavBar = () => {
  const handleNavButtonClick = () =>{
    let nav = document.getElementById("nav-menu");
    nav.classList.toggle("active");
  }
  const handleHomeIconClick = () =>{
    let nav = document.getElementById("nav-menu");
    nav.classList.remove("active");
  }
  return (
    <>
    <div id="nav-bar-bar">
      <button onClick={handleNavButtonClick} className="nav-button" ><img src={navBtn} alt="navigation button"/></button>
      <Link onClick={handleHomeIconClick} id="li" to="/">
        <img src={logo} alt="Joshua Gasrt logo" id="logo"/>
      </Link>
    </div>
      <nav id="nav-menu">
        <Link onClick={handleNavButtonClick} id="li" to="/">
          <img className="home-button" src={homeImg} alt="home button" />
          <a>Home</a>
        </Link>
        <Link onClick={handleNavButtonClick} id="li" to="/about">
          About
        </Link>
        <Link onClick={handleNavButtonClick} id="li" to="/projects">
          Projects
        </Link>
        <Link onClick={handleNavButtonClick} id="li" to="/resume">
          Resume
        </Link>
        <Link onClick={handleNavButtonClick} id="li" to="/contactMe">
          Contact Me
        </Link>
      </nav>
    </>
  );
};

export default NavBar;
