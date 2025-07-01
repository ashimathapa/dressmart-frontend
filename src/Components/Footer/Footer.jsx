import React from 'react';
import './Footer.css';
import { FaInstagram, FaPinterest, FaFacebook } from 'react-icons/fa'; // Import the social media icons
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <p>DRESSMART</p>
      </div>
      <ul className="footer-links">
        <Link to='/about us' style={{ textDecoration: 'none', color: 'inherit' }}><li>Company</li></Link>
        <Link to='/about us' style={{ textDecoration: 'none', color: 'inherit' }}><li>Product</li></Link>
        <Link to='/about us' style={{ textDecoration: 'none', color: 'inherit' }}><li>Offices</li></Link>
        <Link to='/about us'style={{ textDecoration: 'none', color: 'inherit' }}><li>About</li></Link>
        <Link to='/about us'style={{ textDecoration: 'none', color: 'inherit' }}><li>Contact</li></Link>
      </ul>
      <div className="footer-socials-icon">
        <div className="footer-icons-container">
          <a href="https://www.instagram.com/__ashima.a" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={30} color="#E1306C" style={{ textDecoration: 'none', color: 'inherit' }} /> {/* Instagram icon */}
          </a>
        </div>
        <div className="footer-icons-container">
          <a href="https://www.pinterest.com/ashima__a" target="_blank" rel="noopener noreferrer">
            <FaPinterest size={30} color="#E60023" style={{ textDecoration: 'none', color: 'inherit' }}/> {/* Pinterest icon */}
          </a>
        </div>
        <div className="footer-icons-container">
          <a href="https://wwww.facebook.com/आशिमा थापा" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={30} color="#25D366" style={{ textDecoration: 'none', color: 'inherit' }} /> {/* WhatsApp icon */}
          </a>
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2024 - All Right Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
