import React, { useState } from "react";
import ProjectItem from "../../components/Projectlistitem/ProjectItem";
import "./Projects.css";
import { Helmet } from "react-helmet-async";
import p1Image from "./cyberdefense.png";
import p2Image from "./datenightorganizer.png";
import p3Image from "./movieApp.png";
import p4Image from "./the-cube.png";

const Projects = () => {
  const [projectList] = useState([
    {
      projectName: "Cyber Defense",
      url: "https://github.com/testler/CyberDefense",
      deploymentUrl: "https://testler.github.io/CyberDefense/",
      image: p1Image,
      description:
        "Cyber Defense is an interactive educational game, teaching basic cyber security concepts. Used HTML, CSS, Git, and JavaScript in development. Optimized for different devices and browsers for user-friendly experience."
    },
    {
      projectName: "Date Night Organizer",
      url: "https://github.com/testler/DateNightOrganizer",
      deploymentUrl: "https://datenightorganizer.netlify.app/resume",
      image: p2Image,
      description:
        "Date Night Organizer is a service-oriented web app to inspire couples. Used Express.js, Node.js, and EJS for server-side rendering, MongoDB, Mongoose, and EJS for database management. Utilized Git, GitHub, and Agile methodologies for efficient and effective management of the project. Aimed to provide personalized, tailored date ideas for users using responsive design for optimal user experience across devices."
    },
    {
      projectName: "The Movie App",
      url: "https://github.com/testler/movieApp",
      deploymentUrl: "",
      image: p3Image,
      description:
        "(currently unavailable due to problems with hosting servers) The Movie App, was developed with team of 4 engineers. Utilized React.js, Node.js, IMDB API, MongoDB for seamless and intuitive movie discovery. Developer used Agile, Git, GitHub, Trello, Slack for efficient and effective management, collaboration, and received positive feedback from users."
    },
    {
      projectName: "The Cube Experiment",
      url: "https://github.com/testler/the-cube/tree/main/the_cube",
      deploymentUrl: "https://thecubeexperiment.netlify.app/",
      image: p4Image,
      description:
        "This is an experiment in 3D web design using React, creating an innovative 3D navigational interface."
    }
  ]);

  return (
    <main className="projects-div" id="outlet">
      <Helmet>
        <title>Joshua Garst's Portfolio | Projects</title>
        <meta name="description" content="Explore Joshua Garst's portfolio of web applications, including Cyber Defense, Date Night Organizer, The Movie App, and The Cube Experiment. Learn about the technologies and methodologies used in each project." />
      </Helmet>
      <div className="projects-heading-card">
        <h1 className="projects-heading-title">Web Projects by Joshua Garst</h1>
        <div className="projects-heading-underline"></div>
        <div className="projects-heading-sub">A showcase of modern web applications, design, and engineering</div>
      </div>
      <div className="projects-grid">
        {projectList.map((project) => (
          <ProjectItem
            key={project.projectName}
            url={project.url}
            deploymentUrl={project.deploymentUrl}
            projectName={project.projectName}
            image={project.image}
            description={project.description}
          />
        ))}
      </div>
    </main>
  );
};

export default Projects;
