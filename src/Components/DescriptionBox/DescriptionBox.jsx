import React, { useState } from 'react';
import './DescriptionBox.css';

const DescriptionBox = () => {
  const [activeTab, setActiveTab] = useState('description');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div 
          className={`descriptionbox-nav-box ${activeTab === 'description' ? 'active' : ''}`} 
          onClick={() => handleTabClick('description')}
        >
          Description
        </div>
        <div 
          className={`descriptionbox-nav-box ${activeTab === 'reviews' ? 'active' : ''}`} 
          onClick={() => handleTabClick('reviews')}
        >
          Reviews (122)
        </div>
      </div>
      <div className="descriptionbox-content">
        <table>
          <tbody>
            <tr>
              <td className="descriptionbox-description" style={{ width: '50%', position: 'relative' }}>
                {activeTab === 'description' ? (
                  <p>
                    At FLORAL SHOP, we specialize in creating beautiful floral arrangements that celebrate life's special moments. 
                    Whether you’re looking for a vibrant bouquet to brighten someone's day or an elegant centerpiece for a wedding, 
                    our skilled florists craft each arrangement with love and artistry.
                  </p>
                ) : (
                  <div className="descriptionbox-reviews">
                    <p>Customer Reviews:</p>
                    <p>★★★★☆ - "Absolutely loved the bouquet!"</p>
                    <p>★★★☆☆ - "Good service, but the delivery was late."</p>
                    <p>★★★★★ - "The flowers were fresh and beautiful!"</p>
                    <p>★★★★☆ - "A bit pricey, but worth it!"</p>
                    <p>★★★★★ - "Best flower shop in town!"</p>
                  </div>
                )}
                {activeTab === 'description' && (
                  <button className="review-button">Write a Review</button>
                )}
              </td>
              <td className="descriptionbox-reviews" style={{ width: '50%' }}>
                {activeTab === 'reviews' && (
                  <div>
                    <p>Customer Reviews:</p>
                    <p>★★★★☆ - "Absolutely loved the bouquet!"</p>
                    <p>★★★☆☆ - "Good service, but the delivery was late."</p>
                    <p>★★★★★ - "The flowers were fresh and beautiful!"</p>
                    <p>★★★★☆ - "A bit pricey, but worth it!"</p>
                    <p>★★★★★ - "Best flower shop in town!"</p>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DescriptionBox;
