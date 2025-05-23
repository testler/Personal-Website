import React from "react";
import { Helmet } from "react-helmet-async";
import resume from "./Joshua Garst Resume.docx";
import pdf from "./Joshua Garst Resume.pdf";
import "./Resume.css";

const Resume = () => {
  return (
    <main className="resume-div" id="outlet">
      <Helmet>
        <title>Joshua Garst's Portfolio | Resume</title>
        <meta name="description" content="Download Joshua Garst's resume in PDF or DOCX format. View his professional experience, skills, and education." />
      </Helmet>
      <div className="resume-heading-card">
        <h1 className="resume-heading-title">Joshua Garst – Resume</h1>
        <div className="resume-heading-underline"></div>
        <div className="resume-heading-sub">Download or view my resume below</div>
      </div>
      <div className="resume-content">
        <div className="resume-preview-card">
          <iframe
            title="Joshua Garst's Resume PDF Preview"
            src={pdf}
            type="application/pdf"
            className="resume-iframe"
            aria-label="Resume PDF Preview"
          >
            <p>
              It appears you don't have a PDF plugin for this browser. No problem...
              you can <a href={pdf}>click here to download the PDF file</a>.
            </p>
          </iframe>
        </div>
        <div className="resume-downloads">
          <a href={pdf} className="resume-download-button" download aria-label="Download PDF Resume">
            Download PDF Resume
          </a>
          <a href={resume} className="resume-download-button" download aria-label="Download DOCX Resume">
            Download DOCX Resume
          </a>
        </div>
      </div>
    </main>
  );
};

export default Resume;
