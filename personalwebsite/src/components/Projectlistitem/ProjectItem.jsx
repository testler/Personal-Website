import React from 'react';
import "./ProjectItem.css";

const ProjectItem = ({url, projectName, image, description, DeploymentUrl}) => {
  return (
    <section>
        <a href={DeploymentUrl}>
            <h3>{projectName}</h3>
            <img src={image} alt={projectName} />
        </a>
            <h5>{description}</h5>
            <a href={url}>The code for the project on github</a>
    </section>
  )
}

export default ProjectItem