import React from 'react'
import { Helmet } from "react-helmet";
import resume from "./Joshua Garst Resume.docx";
import pdf from "./Joshua Garst Resume.pdf"
import "./Resume.css";

const Resume = () => {
  return (
    <div className="resume-div" id="outlet">
      <Helmet>
      <title>Joshua Garst's Portfolio | Resume</title>
      </Helmet>
      <h1 className='page-title'>Below is a preview of my resume</h1>
      <br />
      <button className='resume-button'><a href={resume}>Click Here to download a .docx of my resume</a></button>
      <br />
      <br />
      <button className='resume-button'><a href={pdf}>Click Here to download a .pdf of my resume</a></button>
      <br />
      <br />
      <iframe id="preview" src={pdf}/>
    </div>
  )
}

export default Resume