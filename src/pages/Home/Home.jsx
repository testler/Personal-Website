import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "./Home.css";
import img from "./closeUp-transformed.avif";
import reactImg from "./react.webp";
import wpImg from "./WordPress.svg";
import basicImg from "./basic-frontend.webp";
import nodeImg from "./nodejs.webp";
import pydjImg from "./python-django.avif";
import cSharpImg from "./C.avif";

const Home = () => {
  return (
    <div className="home-div">
      <Helmet title="Joshua Garst's Portfolio" />
      <title>Joshua Garst's Portfolio</title>
      <div id="top-div">
        <section className="img-block">
          <img className="home-img" src={img} alt="A photo of Joshua Garst" loading="lazy" />
        </section>
        <section className="name-caption-block">
          <h1 className="home-text">Joshua Garst</h1>
          <h2 className="subtext page-title">Full-stack Software Engineer</h2>
          <hr />
        </section>
      </div>
      <h3 className="description">Primary Tech Stacks</h3>
      <div className="lists">
        <ul className="backend">
          <h4>Back-Ends:</h4>
          <img className="stackImg" src={cSharpImg} alt="C Sharp logo" loading="lazy" />
          <img className="stackImg" src={nodeImg} alt="node.js logo" loading="lazy" />
          <img className="stackImg" src={pydjImg} alt="Python Django logo" loading="lazy" />
        </ul>
        <ul className="frontend">
          <h4>Front-Ends:</h4>
          <img className="stackImg" src={reactImg} alt="react.js logo" loading="lazy" />
          <img className="stackImg" src={wpImg} alt="Word Press logo" loading="lazy" />
          <img className="stackImg" src={basicImg} alt="HTML5, CSS3 AND JavaScript logos" loading="lazy" />
        </ul>
      </div>

    </div>
  );
};

export default Home;
