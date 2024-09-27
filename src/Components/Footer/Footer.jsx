import React from 'react';
import './Footer.css';
import footer_logo from '../Assets/logo.jpeg';
import { FaInstagram, FaPinterest, FaWhatsapp } from 'react-icons/fa'; // Import the social media icons

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>FLORAL SHOP</p>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Flowers</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-socials-icon">
        <div className="footer-icons-container">
          <a href="https://www.instagram.com/yourusername" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={30} color="#E1306C" /> {/* Instagram icon */}
          </a>
        </div>
        <div className="footer-icons-container">
          <a href="https://www.pinterest.com/yourusername" target="_blank" rel="noopener noreferrer">
            <FaPinterest size={30} color="#E60023" /> {/* Pinterest icon */}
          </a>
        </div>
        <div className="footer-icons-container">
          <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp size={30} color="#25D366" /> {/* WhatsApp icon */}
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
