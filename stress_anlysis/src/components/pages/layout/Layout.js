import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css'; // Assuming you have a separate CSS file for layout styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1>Stress Research Analyzer</h1>
          </Link>
        </div>
        <nav className="nav-links">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/signup" className="nav-link">Sign Up</Link>
        </nav>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer-section">
        <div className="footer-content">
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
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
    </div>
  );
};

export default Layout;
