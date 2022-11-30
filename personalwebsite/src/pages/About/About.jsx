import React from "react";
import "./About.css";
import { Helmet } from "react-helmet";
import index from "./Languages/index";

const About = () => {
  return (
    <div className="about-div" id="outlet">
      <Helmet>
        <title>Joshua Garst's Portfolio | About</title>
      </Helmet>
      <div className="main-about">
        <h3>About</h3>
        <p>
          Software engineer with a background in fulfillment logistics,
          management, and e-commerce. Education in full-stack end-to-end
          development. My experience and education enable me to create strong
          teams that work effectively to solve complex problems and create
          innovative solutions.
        </p>
      </div>
      <section className="left-about">
        <ul>
          <h5>Tools and Skills</h5>
          {index.tools.map((tool) => {
            return (
              <li key={tool.name}>
                <img src={tool.img} alt={tool.name} className="about-icon"/>
                <h6>{tool.name}</h6>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="right-about">
        <ul>
          <h5>Programming Languages</h5>
          {index.langs.map((lang) => {
            return (
              <li key={lang.name}>
                <img src={lang.img} alt={lang.name} className="about-icon"/>
                <h6>{lang.name}</h6>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default About;
