import React from 'react';
import "./ContactMe.css";
import { Helmet } from "react-helmet";

const Contactme = () => {
  return (
    <div className="contact">
      <Helmet>
        <title>My Portfolio | Contact Me</title>
      </Helmet>
      <h2>For any business inquiries I can be reached at these addresses</h2>
      <ul>
        <li>Phone#: (940) 783-0938</li>
        <li>E-mail: joshuagarst@gmail.com</li>
      </ul>
    </div>
  )
}

export default Contactme