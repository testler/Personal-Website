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
        "Cyber Defense is a purely HTML5, CSS3 and Javascript deployed educational game.  It was my first major project using heavy javascript.  The goal was to create a game that educates people on cybersecurity.  I achieved creating a game, but I am still working on implementing the more educational aspects.",
    },
    {
      projectName: "Date Night Organizer",
      url: "https://github.com/testler/DateNightOrganizer",
      deploymentUrl: "https://datenightorganizer.herokuapp.com/",
      image: p2Image,
      description:
        "A web app created and deployed using Node.js, mongoose, MongoDB, and express.js.  This app helps you create, organize, and randomly pick date night ideas for you and your significant other.  The idea is to simplify thinking of things to do so that you can spend more time doing them.  Many indecisive people are out there, and this site is for them or their significant other.",
    },
    {
      projectName: "The Movie App",
      url: "https://github.com/testler/movieApp",
      deploymentUrl: "https://runtimeterror1.herokuapp.com/",
      image: p3Image,
      description:
        " This is a full-stack application using React.js, Javascript, Token auth, CSS and HTML for the front end and MongoDB, mongoose, Node.js, Express.js, JavaScript and integrating the IMDB API for the back end.  An app that help you find movies you want to watch, and create a watchlist of them all",
    },
    {
      projectName: "All Things By AV",
      url: "https://github.com/testler/AllyvegaStoreFrontend",
      deploymentUrl: "WIP",
      image: p4Image,
      description:
        "This is an e-commerce website created for my sister's business and was created with angular, Typescript, css and HTML for the frontend and Java, Spring boot, Spring data, postgreSQL for the backend and database.",
    },
  ]);
  return (
    <section id="outlet">
      <Helmet>
        <title>Joshua Garst's Portfolio | Projects</title>
      </Helmet>
      <h1>Web Applications</h1>
      <h2>Developed by Joshua Garst</h2>
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
            <br/>
            <hr className="project-hr"></hr >
            <br/>
          </span>
        );
      })}
    </section>
  );
};

export default Projects;
