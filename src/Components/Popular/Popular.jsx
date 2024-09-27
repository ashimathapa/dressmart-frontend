import React from 'react';
import './Popular.css';
import data_flower from '../Assets/data';
import Item from '../Item/Item';

const Popular = () => {
  return (
    <div className='popular'>
      <h1>POPULAR FOR GIFTS</h1>
      <hr />
      <div className="popular-item">
        {data_flower.map((item) => {
          return (
            <Item
              key={item.id} // Use item.id as the key
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
