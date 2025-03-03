import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './Footer.css'; // Add custom styles for the footer here




const Footer = (props) => {

  const isUserLoggedIn = props.isLoggedIn;
  const navigate = useNavigate();
  // console.log("Role ->>>>>>" + props.user.role);
  const FeedbackPage = () => {
    if(isUserLoggedIn){
    navigate("/feedback");
  }else{
    navigate("/login");
  }
  }

  const AboutPage = ()=>{
     if(isUserLoggedIn){
    navigate("/about");
  }else{
    navigate("/login");
  }
   
  }

  const PPPage = ()=>{
    if(isUserLoggedIn){
      navigate("/privacyPolicy");
    }else{
      navigate("/login");
    }
    
  }

  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
          <li>
              <button className="footer-link-btn" onClick={FeedbackPage}>
                Feedback
              </button>
            </li>
            <li> <button className="footer-link-btn" onClick={AboutPage}>
                About Us
              </button>
              </li>
            {/* <li><Link to="/contact">Contact</Link></li> */}
            <li><button className="footer-link-btn" onClick={PPPage}>
                Privacy Policy
              </button>
            </li>
          </ul>
        </div>
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: support@stressresearchanalyzer.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
        <div className="footer-newsletter">
          <h3>Subscribe to Our Newsletter</h3>
          <form>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Stress Research Analyzer. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
