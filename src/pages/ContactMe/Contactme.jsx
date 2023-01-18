import React from 'react';
import "./ContactMe.css";
import { Helmet } from "react-helmet";
import logo from "./logo1.png"

const Contactme = () => {
  return (
    <div className="contact" id="outlet">
      <Helmet>
        <title>My Portfolio | Contact Me</title>
      </Helmet>
      <h2 className='page-title'>I can be reached at:</h2>
      <ul>
        <li>Phone#: +1(940)783-0938</li>
        <li>E-mail: joshuagarst@gmail.com</li>
      </ul>
      <img src={logo} id="about-logo" alt="Joshua Garst logo" />
    </div>
  )
}

export default Contactme