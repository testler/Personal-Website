import React from 'react';
import "./ProjectItem.css";

const ProjectItem = ({ url, projectName, image, description, DeploymentUrl }) => {
  return (
    <section className="pi-item">
      <h3 className="pi-title" href={DeploymentUrl}>{projectName}</h3>
      <img href={DeploymentUrl} className="pi-img" src={image} alt={projectName} />

      <h5 className='pi-description'>{description}</h5>
      <a className="pi-link" href={url}>
        <button className="git-link">The code for the project on github</button>
      </a>
      {DeploymentUrl == "WIP" ?
        <a className="WIP" href={DeploymentUrl}>
          <button className="WIP">Still in development</button>
        </a> :
        <a className="pi-link" href={DeploymentUrl}>
          <button className="deploy-link">The deployed site</button>
        </a>
      }
    </section>
  )
}

export default ProjectItem