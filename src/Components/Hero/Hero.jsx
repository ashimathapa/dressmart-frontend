import React from 'react';
import './Hero.css';
import flower1 from '../Assets/flower1.jpeg'; // Update with your actual paths
import flower2 from '../Assets/flower2.jpeg';
import flower3 from '../Assets/flower3.jpeg';
import flower4 from '../Assets/flower4.jpeg';
import flower5 from '../Assets/flower5.jpeg';
import flower6 from '../Assets/flower6.jpeg';

const Hero = () => {
  return (
    <div className='hero'>
      <div className="banner-text">
        <h1>Flowers, 🌻 what the world needs</h1>
        <p>Browse between hundreds of flowers</p>
        <button>Browse</button>
      </div>

      <div className="hero-right">
        <div className="hero-images">
          <div className="upper-row">
            <img src={flower1} alt="Flower 1" />
            <img src={flower2} alt="Flower 2" />
            <img src={flower3} alt="Flower 3" />
          </div>
          <div className="lower-row">
            <img src={flower4} alt="Flower 4" />
            <img src={flower5} alt="Flower 5" />
            <img src={flower6} alt="Flower 6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
