import React from 'react';
import '../css/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Movie Hub</h3>
          <p>Your destination for exploring and discovering movies.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/favorites">Favorites</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: contact@moviehub.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} Movie Hub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;