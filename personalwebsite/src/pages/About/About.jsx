import React from 'react';
import "./About.css";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <div className="about-div">
      <Helmet>
        <title>Joshua Garst's Portfolio | About</title>
      </Helmet>
      <h1>About</h1>
      <h3>Software engineer with 2 years of experience in full-stack development, creating, and managing  teams.  Working to improve workflows and improve team efficiency.  Patience, persistence, and a hunger for solving complex problems enable me to create high quality programs and boost customer interest.  My background provides me with a unique set of skills to create and build teams that excel at making customers happy. I look forward to hearing from you.</h3>
    </div>
  )
}

export default About