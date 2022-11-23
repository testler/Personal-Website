import React from 'react'
import { Helmet } from "react-helmet";
import resume from "../../assets/Joshua Garst Resume.docx";
import pdf from "../../assets/Joshua Garst Resume 1.pdf"
import "./Resume.css";

const Resume = () => {
  return (
    <div className="resume-div" >
      <Helmet>
      <title>Joshua Garst's Portfolio | Resume</title>
      </Helmet>
      <h1>Below is a preview of my resume</h1>
      <br />
      <button><a href={resume}>Click Here to download a .docx of my resume</a></button>
      <br />
      <br />
      <button><a href={pdf}>Click Here to download a .pdf of my resume</a></button>
      <br />
      <br />
      <iframe id="preview" src={pdf}/>
      
    </div>
  )
}

export default Resume