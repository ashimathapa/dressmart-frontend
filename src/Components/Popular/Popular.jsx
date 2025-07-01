import React, { useEffect, useState } from 'react';
import './Popular.css';
import Item from '../Item/Item';

const Popular = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/allproducts')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => {
        console.error('Failed to fetch products:', error);
      });
  }, []);

  return (
    <div className="new-collections">
      <h1>Popular For Women</h1>
      <hr />
      <div className="collections">
        {products.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Popular;
