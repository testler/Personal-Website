import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import "./Home.css";
import img from "../../assets/closeUp.jpg";

const Home = () => {
  return (
    <div className="home-div">
      <Helmet>
        <title>Joshua Garst's Portfolio</title>
      </Helmet>
      <title>Joshua Garst's Portfolio</title>
      <img className="home-img" src={img} alt="me" loading="lazy"/>
      <h1 className="home-text">Joshua Garst</h1>
      <h2 className="home-text">Full-stack Software Engineer</h2>
    </div>
  )
}

export default Home