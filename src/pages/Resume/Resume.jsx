import React from "react";
import { Helmet } from "react-helmet";
import resume from "./Joshua Garst Resume.docx";
import pdf from "./Joshua Garst Resume.pdf";
import "./Resume.css";

const Resume = () => {
  return (
    <div className="resume-div" id="outlet">
      <Helmet>
        <title>Joshua Garst's Portfolio | Resume</title>
      </Helmet>
      <h1 id="resume-title"className="page-title">My resume</h1>
      <br />
      <object
        id="resume-preview"
        data={pdf}
        type="application/pdf"
      >
        <p>
          It appears you don't have a PDF plugin for this browser. No biggie...
          you can <a href="resume.pdf">click here to download the PDF file.</a>
        </p>
      </object>
      <button className="resume-button">
        <a href={resume}>Download DOCX resume</a>
      </button>
      <button className="resume-button">
        <a href={pdf}>Download PDF resume</a>
      </button>
    </div>
  );
};

export default Resume;
