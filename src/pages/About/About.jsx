import React from "react";
import "./About.css";
import { Helmet } from "react-helmet-async";
import index from "./Languages/index";

const About = () => {
  return (
    <main className="about-div" id="outlet">
      <Helmet>
        <title>Joshua Garst's Portfolio | About</title>
        <meta name="description" content="Learn more about Joshua Garst, a software engineer with a background in fulfillment logistics, management, and e-commerce. Explore his skills, tools, and programming languages." />
      </Helmet>
      <div className="about-cards-container">
        <section className="about-card about-main-card">
          <h1 className="about-title">About Me</h1>
          <p className="about-intro">
            Software engineer with a background in fulfillment logistics, management, and e-commerce. Education in full-stack end-to-end development. My experience and education enable me to create strong teams that work effectively to solve complex problems and create innovative solutions.
          </p>
        </section>
        <section className="about-card about-skills-card">
          <h2 className="about-section-title">Tools & Skills</h2>
          <div className="about-skills-grid">
            {index.tools.map((tool) => (
              <div key={tool.name} className="about-skill-item">
                <img src={tool.img} alt={`Logo for ${tool.name}`} className="about-skill-icon" />
                <span>{tool.name}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="about-card about-langs-card">
          <h2 className="about-section-title">Programming Languages</h2>
          <div className="about-skills-grid">
            {index.langs.map((lang) => (
              <div key={lang.name} className="about-skill-item">
                <img src={lang.img} alt={`Logo for ${lang.name}`} className="about-skill-icon" />
                <span>{lang.name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
