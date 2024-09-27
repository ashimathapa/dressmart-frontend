import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/exclusive_image.jpeg'

const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-left">
          <h1>Exclusive Floral Collection</h1>
          <h1>Offers for you</h1>
          <p>ONLY ON BEST SELLERS FLOWERS</p>
          <button>Check Now</button>
        </div>
        <div className="offers-right">
            <img src={exclusive_image} alt="" />

        </div>

      
    </div>
  )
}

export default Offers
