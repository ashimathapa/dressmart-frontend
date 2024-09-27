import React, { useContext } from 'react';
import './FlowerDisplay.css';
import { FaStar, FaRegStar } from 'react-icons/fa'; // Using Material-UI icons
import { ShopContext } from '../../Context/ShopContext';

const FlowerDisplay = (props) => {
  const { flower } = props;
  const {addToCart} = useContext(ShopContext);
  return (
    <div className='flowerdisplay'>
      <div className="flowerdisplay-left">

        <div className="flowerdisplay-img">
          <img className='flowerdisplay-main-img' src={flower.image} alt={flower.name} />
        </div>
      </div>

      <div className="flowerdisplay-right">
        <h1>{flower.name}</h1>
        <div className="flowerdisplay-right-star">
        <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaRegStar /> 
          <p>(123)</p>
        </div>
        <div className="flowerdisplay-right-prices">
          <div className="flowerdisplay-right-price-old">${flower.old_price}</div>
          <div className="flowerdisplay-right-price-new">${flower.new_price}</div>
        </div>
        <div className="flowerdisplay-right-description">
         Make every day brighter with our abundant bouquet of fresh sunflowers. 
        These radiant, long-lasting blooms bring that just-picked- from-the-meadow feeling to birthdays, get well wishes, or any day you want to make someone you care about smile.
        </div>
      <button onClick={()=>{addToCart(flower.id)}} >ADD TO CART</button>
      </div>
    </div>
  );
};

export default FlowerDisplay;
