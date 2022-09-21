import React from 'react';
import "./ProjectItem.css";

const ProjectItem = ({url, projectName, image, description, DeploymentUrl}) => {
  return (
    <section className="pi-item">
        <h3 className="pi-title" href={DeploymentUrl}>{projectName}</h3>
        <img href={DeploymentUrl} className="pi-img" src={image} alt={projectName} />
        
        <a   className="pi-p1" href={url}>
            <h5>{description}</h5>
            <span className="git-link">The code for the project on github</span>
        </a>
    </section>
  )
}

export default ProjectItem