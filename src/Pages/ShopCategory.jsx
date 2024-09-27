import React from 'react';
import './CSS/ShopCategory.css';
import { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { FaChevronDown } from 'react-icons/fa'; // Import the dropdown icon from react-icons
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  console.log('ShopCategory Props:', props);  // Add this line for debugging
  const { all_flower } = useContext(ShopContext);

  return (
    <div className='shop-category'>
      <img src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-4</span> out of 16 flowers
        </p>
        <div className='shopcategory-sort'>
          Sort by <FaChevronDown /> {/* Replace dropdown image with icon */}
        </div>
      </div>
      <div className="shopcategory-product">
        {all_flower.map((item) => {
          if (props.category === item.category) {
            return (
              <Item
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default ShopCategory;
