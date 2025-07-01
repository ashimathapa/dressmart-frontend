import React from 'react';
import './SaleBanner.css';
import { Link } from 'react-router-dom';

const SaleBanner = () => {
  return (
    <div className="sale-banner">
      <h2 className="sale-banner__heading">Up To <span>80% OFF</span></h2>
      <h3 className="sale-banner__subheading">DRESSMART</h3>
      <p className="sale-banner__description">
        All our small-sized sale products, carefully curated by category so you can find your perfect fit.
      </p>
      <Link to='/Mens' style={{ textDecoration: 'none', color: 'inherit' }}><button className="shop-now-button">SHOP NOW</button></Link>
    </div>
  );
};

export default SaleBanner;
