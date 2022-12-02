import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "./Home.css";
import img from "./closeUp-transformed.png";
import reactImg from "./react.png";
import angularImg from "./angular-logo.png";
import basicImg from "./basic-frontend.png";
import springImg from "./springBoot.png";
import nodeImg from "./nodejs.svg";
import pydjImg from "./python-django.png";

const Home = () => {
  return (
    <div className="home-div">
      <Helmet title="Joshua Garst's Portfolio" />
      <title>Joshua Garst's Portfolio</title>
      <div id="top-div">
        <section className="img-block">
          <img className="home-img" src={img} alt="A phot of Joshua Garst" loading="lazy" />
        </section>
        <section className="name-caption-block">
          <h1 className="home-text">Joshua Garst</h1>
          <h2 className="subtext">Full-stack Software Engineer</h2>
          <hr />
        </section>
      </div>

      <h3 className="description">Primary Tech Stacks</h3>
      <div className="lists">
        <ul className="backend">
          <h4>Back-Ends:</h4>
          <img className="stackImg" src={springImg} alt="Java Spring Boot" loading="lazy" />
          <hr />
          <img className="stackImg" src={nodeImg} alt="node.js" loading="lazy" />
          <hr />
          <img className="stackImg" src={pydjImg} alt="Python Django" loading="lazy" />
        </ul>
        <ul className="frontend">
          <h4>Front-Ends:</h4>
          <img className="stackImg" src={reactImg} alt="react.js" loading="lazy" />
          <hr />
          <img
            className="stackImg" src={angularImg} alt="Angular" loading="lazy" />
          <hr />
          <img className="stackImg" src={basicImg} alt="HTML5, CSS3 AND JavaScript" loading="lazy" />
        </ul>
      </div>

    </div>
  );
};

export default Home;
