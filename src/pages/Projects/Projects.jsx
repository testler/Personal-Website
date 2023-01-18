import React, { useState } from "react";
import ProjectItem from "../../components/Projectlistitem/ProjectItem";
import "./Projects.css";
import { Helmet } from "react-helmet";
import p1Image from "./cyberdefense.png";
import p2Image from "./datenightorganizer.png";
import p3Image from "./movieApp.png";
import p4Image from "./AllThingsAV.jpg";

const Projects = () => {
  const [projectList, setProjectList] = useState([
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
      deploymentUrl: "https://datenightorganizer.herokuapp.com/",
      image: p2Image,
      description:
      "Date Night Organizer is a service-oriented web app to inspire couples. Used Express.js, Node.js, and EJS for server-side rendering, MongoDB, Mongoose, and EJS for database management. Utilized Git, GitHub, and Agile methodologies for efficient and effective management of the project. Aimed to provide personalized, tailored date ideas for users using responsive design for optimal user experience across devices.",
    },
    {
      projectName: "The Movie App",
      url: "https://github.com/testler/movieApp",
      deploymentUrl: "https://runtimeterror1.herokuapp.com/",
      image: p3Image,
      description:
        "The Movie App, was developed with team of 4 engineers. Utilized React.js, Node.js, IMDB API, MongoDB for seamless and intuitive movie discovery. Developer used Agile, Git, GitHub, Trello, Slack for efficient and effective management, collaboration, and received positive feedback from users."
          },
    {
      projectName: "All Things By AV",
      url: "https://github.com/testler/AllyvegaStoreFrontend",
      deploymentUrl: "WIP",
      image: p4Image,
      description:
        "All Things AV is an e-commerce storefront that uses Angular and Java Spring Boot. Implemented endpoints protection, used PostgreSQL for data storage. Utilized Angular for UI/UX, delivered project on time, budget, exceeded client expectations."    },
  ]);
  return (
    <section id="outlet">
      <Helmet>
        <title>Joshua Garst's Portfolio | Projects</title>
      </Helmet>
      <h1 className="page-title">Web Applications</h1>
      <h2 className="page-title">Developed by Joshua Garst</h2>
      {projectList.map((project) => {
        return (
          <span>
            <ProjectItem
              key={project.projectName}
              url={project.url}
              DeploymentUrl={project.deploymentUrl}
              projectName={project.projectName}
              image={project.image}
              description={project.description}
            ></ProjectItem>
            <br />
            <hr className="project-hr"></hr>
            <br />
          </span>
        );
      })}
    </section>
  );
};

export default Projects;
