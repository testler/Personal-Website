import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "./Home.css";
import img from "./closeUp-transformed.png";
import reactImg from "./react.png";
import angularImg from "./angular-logo.png.webp";
import basicImg from "./basic-frontend.png";
import springImg from "./springBoot.png";
import nodeImg from "./nodejs.svg"
import pydjImg from "./python-django.png"

const Home = () => {
  return (
    <div className="home-div">
      <Helmet
        title="Joshua Garst's Portfolio"
        link={[
              {"rel": "icon", 
               "href": "%PUBLIC_URL%/favicon.ico"
              }
             ]}
/>
      <title>Joshua Garst's Portfolio</title>
      <section className="img-block">
        <img
          className="home-img"
          src={img}
          alt="A phot of Joshua Garst"
          loading="lazy"
        />
      </section>
      <section className="text-block">
        <h1 className="home-text">Joshua Garst</h1>
        <h2 className="home-text subtext">Full-stack Software Engineer</h2>
        <hr />
        <br />
        <h3 className="description">I am very adaptable, but these are my primary tech stacks</h3>
        <br />
        <div className="lists">
          <ul className="backend">Back-Ends:
            <li className="stackImg"><img
              className="stackImg"
              src={springImg}
              alt="Java Spring Boot"
              loading="lazy"
            /></li>
            <hr />
            <li className="stackImg"><img
              className="stackImg"
              src={nodeImg}
              alt="node.js"
              loading="lazy"
            /></li>
            <hr />
            <li className="stackImg"><img
              className="stackImg"
              src={pydjImg}
              alt="Python Django"
              loading="lazy"
            /></li>
          </ul>
          <ul className="frontend">Front-Ends:
            <li><img
              className="stackImg"
              src={reactImg}
              alt="react.js"
              loading="lazy"
            /></li>
            <hr />
            <li><img
              className="stackImg"
              src={angularImg}
              alt="Angular"
              loading="lazy"
            /></li>
            <hr />
            <li><img
              className="stackImg"
              src={basicImg}
              alt="HTML5, CSS3 AND JavaScript"
              loading="lazy"
            /></li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;
