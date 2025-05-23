import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import profileImg from '../../assets/profile.webp';

// List of SVGs in src/assets (excluding profile.jpg)
const techIcons = [
  { src: require('../../assets/typescript.svg').default, name: 'TypeScript' },
  { src: require('../../assets/nodedotjs.svg').default, name: 'Node.js' },
  { src: require('../../assets/express.svg').default, name: 'Express' },
  { src: require('../../assets/css3.svg').default, name: 'CSS3' },
  { src: require('../../assets/htmx.svg').default, name: 'HTMX' },
  { src: require('../../assets/html5.svg').default, name: 'HTML5' },
  { src: require('../../assets/mongoose.svg').default, name: 'Mongoose' },
  { src: require('../../assets/mongodb.svg').default, name: 'MongoDB' },
  { src: require('../../assets/python.svg').default, name: 'Python' },
  { src: require('../../assets/react.svg').default, name: 'React' },
  { src: require('../../assets/jquery.svg').default, name: 'jQuery' },
  { src: require('../../assets/dotnet.svg').default, name: '.NET' },
  { src: require('../../assets/js.svg').default, name: 'JavaScript' },
];

const Home = () => {
  return (
    <div className="home-div">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Joshua Garst</h1>
          <h2 className="hero-subtitle">Software Developer</h2>
          <p className="hero-description">
            Building innovative solutions with modern technologies
          </p>
          <div className="hero-cta">
            <Link to="/projects" className="cta-button primary">
              View Projects
            </Link>
            <Link to="/resume" className="cta-button secondary">
              View Resume
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src={profileImg} 
            alt="Joshua Garst" 
            className="profile-image"
            loading="lazy"
            width="300"
            height="300"
            decoding="async"
          />
        </div>
      </section>

      <section className="tech-section">
        <h2 className="tech-title">Technical Knowledge</h2>
        <div className="tech-grid">
          {techIcons.map(icon => (
            <div className="tech-item" key={icon.name}>
              <img 
                src={icon.src} 
                alt={icon.name} 
                className="tech-icon"
                loading="lazy"
                width="48"
                height="48"
                decoding="async"
              />
              <span>{icon.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home; 