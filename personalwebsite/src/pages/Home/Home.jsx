import React, { useEffect, useState } from 'react';
import "./Home.css";
import img from "../../assets/closeUp.jpg";

const Home = () => {
  useEffect(() => document.title = "Joshua Garst", []);

  return (
    <div className="home-div">
      <img className="home-img" src={img} alt="me" loading="lazy"/>
      <h1 className="home-text">Joshua Garst</h1>
      <h2 className="home-text">Full-stack Software Engineer</h2>
    </div>
  )
}

export default Home