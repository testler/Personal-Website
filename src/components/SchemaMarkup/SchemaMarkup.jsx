import React from 'react';
import { Helmet } from 'react-helmet-async';

const SchemaMarkup = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Joshua Garst",
    "url": "https://joshua-garst-portfolio-website.netlify.app/",
    "jobTitle": "Full-stack Software Engineer",
    "description": "Software engineer with a background in fulfillment logistics, management, and e-commerce. Education in full-stack end-to-end development.",
    "email": "joshuagarst@gmail.com",
    "telephone": "+1-940-783-0938",
    "image": "https://joshua-garst-portfolio-website.netlify.app/personal-website-assets/logo1.png",
    "sameAs": [
      "https://github.com/testler",
      "https://www.linkedin.com/in/joshua-garst/",
      "https://joshua-garst-portfolio-website.netlify.app/"
    ],
    "knowsAbout": [
      "C#",
      "Node.js",
      "Python",
      "Django",
      "React",
      "WordPress",
      "HTML5",
      "CSS3",
      "JavaScript"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default SchemaMarkup; 