import React from 'react';
import "./ProjectItem.css";

const ProjectItem = ({ url, projectName, image, description, deploymentUrl }) => {
  return (
    <article className="project-card">
      <img className="project-image" src={image} alt={projectName + ' screenshot'} />
      <div className="project-content">
        <h3 className="project-title">{projectName}</h3>
        <p className="project-description">{description}</p>
        <div className="project-links">
          <a className="project-link" href={url} target="_blank" rel="noopener noreferrer">
            <button className="git-link">GitHub Repo</button>
          </a>
          {deploymentUrl ? (
            <a className="project-link" href={deploymentUrl} target="_blank" rel="noopener noreferrer">
              <button className="deploy-link">Live Site</button>
            </a>
          ) : (
            <button className="deploy-link" disabled>Not Deployed</button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectItem;