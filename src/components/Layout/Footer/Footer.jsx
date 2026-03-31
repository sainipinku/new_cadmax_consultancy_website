import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import logo from "../../../assets/Images/cadmax-logo/footer-logo.png";
import facebook from '../../../assets/icons/Social_icon/Vector.png';
import instagram from '../../../assets/icons/Social_icon/mdi_instagram.png';
import linkdin from '../../../assets/icons/Social_icon/mdi_linkedin.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top container">
        
        {/* Left Logo */}
        <img
          src={logo}
          alt="Logo"
          className="footer-logo"
        />

        {/* Social PNG icons */}
       <div className="footer-social">
  <a
    href="https://www.facebook.com/CadMaxProjectsJPR"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img src={facebook} alt="Facebook" className="social-icon" />
  </a>

  <a
    href="https://www.instagram.com/cadmaxconsultancy/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img src={instagram} alt="Instagram" className="social-icon" />
  </a>

  <a
    href="https://www.linkedin.com/company/cadmax-projects-pvt-ltd/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img src={linkdin} alt="LinkedIn" className="social-icon" />
  </a>
</div>


      </div>

      <div className="footer-line"></div>

      <div className="footer-links container">
        <Link to="/about" className="footer-link">ABOUT US</Link>
       <Link to="/contact" className="footer-link">CONTACT US</Link>
         <Link to="/Services" className="footer-link">SERVICES</Link>
        <Link to="/projects" className="footer-link">OUR PROJECTS</Link>
        <Link to="" className="footer-link">NEWS AND ARTICLES</Link>
       
       
      </div>

      <div className="footer-line"></div>
      <div className="copyright"><p>
        </p>Copyright © Dipen Gada & Associates. All Rights Reserved.</div>
    </footer>
  );
};

export default Footer;
