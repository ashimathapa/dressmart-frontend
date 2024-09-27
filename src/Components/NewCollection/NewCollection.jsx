import React from 'react';
import './NewCollection.css';
import new_collection from '../Assets/new_collection'; // Make sure this path is correct
import Item from '../Item/Item'; // Import the Item component

const NewCollection = () => {
  return (
    <div className='new-collections'>
      <h1>NEW COLLECTION</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item) => {
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
}

export default NewCollection;
