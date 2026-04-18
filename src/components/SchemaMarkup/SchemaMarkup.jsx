import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://joshua-garst-portfolio-website.netlify.app';

const SchemaMarkup = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Joshua Garst",
    "givenName": "Joshua",
    "familyName": "Garst",
    "url": SITE_URL,
    "jobTitle": "Full-Stack Software Engineer",
    "description": "Full-stack .NET software engineer with 3+ years professional experience in enterprise CRM systems, Azure cloud services, C#, and JavaScript. Builds reliable, data-driven systems that real people rely on every day.",
    "email": "joshuagarst@gmail.com",
    "telephone": "+1-940-783-0938",
    "image": `${SITE_URL}/og-preview.jpg`,
    "sameAs": [
      "https://github.com/testler",
      "https://www.linkedin.com/in/joshua-garst/"
    ],
    "knowsAbout": [
      "C#", "ASP.NET", ".NET", "JavaScript", "TypeScript", "Python",
      "React", "Node.js", "Express", "jQuery", "Knockout.js", "Three.js",
      "Entity Framework", "Django", "Spring Boot",
      "HTML5", "CSS3", "SQL", "PHP",
      "Microsoft SQL Server", "MongoDB", "PostgreSQL", "SQLite",
      "Azure Functions", "Azure Blob Storage", "Azure Application Insights",
      "Dynamics 365 CRM", "CI/CD Pipelines", "Docker",
      "Git", "Visual Studio", "VS Code", "Vite", "Webpack"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Sharp Hue"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Coding Boot Camp"
    },
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Full-Stack Software Engineer",
      "occupationalCategory": "15-1252.00",
      "skills": "C#, ASP.NET, JavaScript, React, Azure, Entity Framework, SQL Server, Node.js, Three.js"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Joshua Garst Interactive Portfolio",
    "url": SITE_URL,
    "description": "An immersive graphic-novel portfolio showcasing full-stack engineering, projects, and career — built with React and Three.js.",
    "author": {
      "@type": "Person",
      "name": "Joshua Garst"
    }
  };

  // FAQ schema — surfaces in AI Overviews and rich snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Who is Joshua Garst?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Joshua Garst is a full-stack .NET software engineer with over 3 years of professional experience. He specializes in enterprise CRM systems, Azure cloud services, C#, and JavaScript. He works at Sharp Hue where he builds and maintains data-driven systems, CRM workflows, and cloud-hosted infrastructure."
        }
      },
      {
        "@type": "Question",
        "name": "What is Joshua Garst's tech stack?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Joshua Garst primarily works with C#, ASP.NET MVC, JavaScript, jQuery, Knockout.js, Dynamics 365 CRM, Azure (Functions, Blob Storage, Application Insights), and Entity Framework. He also has experience with React, Node.js, TypeScript, Python, Django, MongoDB, PostgreSQL, Three.js, Docker, and CI/CD pipelines."
        }
      },
      {
        "@type": "Question",
        "name": "What kind of projects has Joshua Garst built?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Joshua Garst has built enterprise CRM workflows managing thousands of customer interactions, .NET Minimal APIs, Azure Functions, CI/CD pipelines, and reporting dashboards. His personal projects include a tower defense game in vanilla JavaScript, a full-stack date night organizer with EJS and MongoDB, a Three.js 3D experiment, and this interactive graphic-novel portfolio built with React and Three.js."
        }
      },
      {
        "@type": "Question",
        "name": "How did Joshua Garst become a software engineer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Joshua Garst transitioned to software engineering through a coding boot camp in 2021. After six months of intensive training while working full-time, he landed a position at Sharp Hue starting as an apprentice and working up to Software Developer II. Before software, he held various roles including delivery driver, solar lead setter, and logistics coordinator."
        }
      },
      {
        "@type": "Question",
        "name": "What are Joshua Garst's career goals?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Joshua Garst is passionate about space exploration, electric vehicles, solar energy, and technologies that push society toward a high-tech future. His core goal is doing meaningful work that impacts people's lives positively."
        }
      },
      {
        "@type": "Question",
        "name": "What are Joshua Garst's hobbies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Outside of software engineering, Joshua Garst is passionate about gardening and permaculture (he helps his grandpa work an orchard in Gravette, Arkansas), 3D printing with his Ender S1+, PC gaming (especially story-driven games like The Dark Pictures series), home improvement, and learning about solar technology and electric vehicles. He drives a Tesla Model S."
        }
      },
      {
        "@type": "Question",
        "name": "What is Joshua Garst's coding philosophy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Joshua Garst subscribes to 'ruthless simplicity' — every line of code is both an asset and a liability. He favors readable, maintainable code over impressive complexity. He believes if you can't understand code from variable names and context alone, it's too complicated. He values simple, effective, and adaptable solutions."
        }
      },
      {
        "@type": "Question",
        "name": "How can I contact Joshua Garst?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Joshua Garst can be reached via email at joshuagarst@gmail.com, by phone at 940-783-0938, on LinkedIn at linkedin.com/in/joshua-garst, or on GitHub at github.com/testler."
        }
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
};

export default SchemaMarkup;
