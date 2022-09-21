import React from 'react'
import { Helmet } from "react-helmet";
import resume from "../../assets/Joshua Garst Resume.docx";
import pdf from "../../assets/Joshua Garst Resume 1.pdf"
import "./Resume.css";

const Resume = () => {
  function downloadFile(){
    window.location = resume;
  };
  return (
    <div className="resume-div" >
      <Helmet>
      <title>Joshua Garst's Portfolio | Resume</title>
      </Helmet>
      <h1>The download will start automatically...<br/> if not <a onload={downloadFile()} href={resume}>click here</a></h1>
      <iframe id="preview" src={pdf}/>
    </div>
  )
}

export default Resume