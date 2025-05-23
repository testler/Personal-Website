import React from 'react';
import "./ContactMe.css";
import { Helmet } from 'react-helmet-async';
import logo from "./logo1.png"

const Contactme = () => {
  return (
    <main className="contact" id="outlet">
      <Helmet>
        <title>Joshua Garst's Portfolio | Contact Me</title>
        <meta name="description" content="Contact Joshua Garst, a software engineer, via phone or email. Get in touch for job opportunities, collaborations, or inquiries." />
      </Helmet>
      <div className="contact-heading-card">
        <h1 className="contact-heading-title">Contact Me</h1>
        <div className="contact-heading-underline"></div>
        <div className="contact-heading-sub">Feel free to reach out for professional inquiries, collaborations, or questions.</div>
      </div>
      <div className="contact-content">
        <div className="contact-info-card">
          <div className="contact-details">
            <p><span role="img" aria-label="Phone">📞</span> <a href="tel:+19407830938" className="contact-link">+1 (940) 783-0938</a></p>
            <p><span role="img" aria-label="Email">✉️</span> <a href="mailto:joshuagarst@gmail.com" className="contact-link">joshuagarst@gmail.com</a></p>
          </div>
          <div className="contact-logo-card">
            <img 
              src={logo} 
              alt="Joshua Garst's personal logo" 
              className="contact-logo"
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Contactme