import React, { useEffect } from 'react';
import "./About.css";

const About = () => {
  useEffect(() => document.title = "About", []);
  return (
    <div className="about-div">
      <h1>About</h1>
      <h3>Software engineer with 2 years of experience in full-stack development, creating, and managing  teams.  Working to improve workflows and improve team efficiency.  Patience, persistence, and a hunger for solving complex problems enable me to create high quality programs and boost customer interest.  My background provides me with a unique set of skills to create and build teams that excel at making customers happy. I look forward to hearing from you.</h3>
    </div>
  )
}

export default About