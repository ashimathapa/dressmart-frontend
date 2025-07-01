import React, { useEffect, useState } from 'react';
import './ReleatedProduct.css';
import Item from '../Item/Item';

const ReleatedProduct = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/allproducts')
      .then((response) => response.json())
      .then((data) => setRelatedProducts(data))
      .catch((err) => console.error('Error fetching related products:', err));
  }, []);

  return (
    <div className='relatedproduct'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproduct-item">
        {relatedProducts.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ReleatedProduct;
