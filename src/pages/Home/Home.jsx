import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
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
    <main className="home-div">
      <Helmet>
        <title>Joshua Garst's Portfolio</title>
        <meta name="description" content="Welcome to Joshua Garst's portfolio website. I am a Full-stack Software Engineer specializing in C#, Node.js, Python Django, React, WordPress, and more." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://joshuagarst.com/" />
        <meta property="og:title" content="Joshua Garst - Full-stack Software Engineer" />
        <meta property="og:description" content="Full-stack Software Engineer specializing in C#, Node.js, Python Django, React, WordPress, and more." />
        <meta property="og:image" content={img} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://joshuagarst.com/" />
        <meta property="twitter:title" content="Joshua Garst - Full-stack Software Engineer" />
        <meta property="twitter:description" content="Full-stack Software Engineer specializing in C#, Node.js, Python Django, React, WordPress, and more." />
        <meta property="twitter:image" content={img} />

        {/* Additional SEO meta tags */}
        <meta name="keywords" content="software engineer, full-stack developer, web development, C#, Node.js, Python, Django, React, WordPress" />
        <meta name="author" content="Joshua Garst" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://joshuagarst.com/" />
      </Helmet>
      <div id="top-div">
        <section className="img-block">
          <img
            className="home-img"
            src={img}
            alt="A professional photo of Joshua Garst, a software engineer"
            srcSet={srcset}
            sizes="(min-width: 780px) 56.26vw, 75vw"
            loading="eager"
          />

        </section>
        <section className="name-caption-block">
          <h1 className="home-text">Joshua Garst</h1>
          <h2 className="subtext">Full-stack Software Engineer</h2>
          <hr />
        </section>
      </div>
      <h3 className="tech-title">Primary Technologies</h3>
      <div className="tech" role="list" aria-label="Primary technologies">
        <div role="listitem">
          <img className="stackImg" src={cSharpImg} alt="C# programming language logo" loading="lazy" />
        </div>
        <div role="listitem">
          <img className="stackImg" src={nodeImg} alt="Node.js runtime environment logo" loading="lazy" />
        </div>
        <div role="listitem">
          <img className="stackImg" src={pydjImg} alt="Python Django web framework logo" loading="lazy" />
        </div>
        <div role="listitem">
          <img className="stackImg" src={reactImg} alt="React.js JavaScript library logo" loading="lazy" />
        </div>
        <div role="listitem">
          <img className="stackImg" src={wpImg} alt="WordPress content management system logo" loading="lazy" />
        </div>
        <div role="listitem">
          <img className="stackImg" src={basicImg} alt="HTML5, CSS3 and JavaScript web technologies logos" loading="lazy" />
        </div>
      </div>
    </main>
  );
};

export default Home;