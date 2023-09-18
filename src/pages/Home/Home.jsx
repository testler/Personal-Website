import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "./Home.css";
import img from "./closeUp.webp";
import reactImg from "./react.webp";
import wpImg from "./WordPress.svg";
import basicImg from "./basic-frontend.webp";
import nodeImg from "./nodejs.webp";
import pydjImg from "./python-django.avif";
import cSharpImg from "./C.avif";

import img256 from './closeUp-256.webp';
import img870 from './closeUp-870.webp';
import img1200 from './closeUp-1200.webp';
import img1460 from './closeUp-1460.webp';
import img1680 from './closeUp-1680.webp';
import img1870 from './closeUp-1870.webp';
import img2048 from './closeUp.webp';

const Home = () => {

  const imageSizes = [
    { img: img256, width: 256, label: '256w' },
    { img: img870, width: 870, label: '870w' },
    { img: img1200, width: 1200, label: '1200w' },
    { img: img1460, width: 1460, label: '1460w' },
    { img: img1680, width: 1680, label: '1680w' },
    { img: img1870, width: 1870, label: '1870w' },
    { img: img2048, width: 2048, label: '2048w' },
  ];

  const srcset = imageSizes.map((size) => `${size.img} ${size.label}`).join(', ');
  return (
    <div className="home-div">
      <Helmet>
        <title>Joshua Garst's Portfolio</title>
      </Helmet>
      <div id="top-div">
        <section className="img-block">
          <img
            className="home-img"
            src={img}
            alt="A photo of Joshua Garst"
            srcSet={srcset}
            sizes="(min-width: 780px) 56.26vw, 75vw"
          />

        </section>
        <section className="name-caption-block">
          <h1 className="home-text">Joshua Garst</h1>
          <h2 className="subtext">Full-stack Software Engineer</h2>
          <hr />
        </section>
      </div>
      <h3 className="tech-title">Primary Technologies</h3>
      <ul className="tech">
        <img className="stackImg" src={cSharpImg} alt="C Sharp logo" />
        <img className="stackImg" src={nodeImg} alt="node.js logo" />
        <img className="stackImg" src={pydjImg} alt="Python Django logo" />
        <img className="stackImg" src={reactImg} alt="react.js logo" />
        <img className="stackImg" src={wpImg} alt="Word Press logo" />
        <img className="stackImg" src={basicImg} alt="HTML5, CSS3 AND JavaScript logos" />
      </ul>
    </div>
  );
};

export default Home;