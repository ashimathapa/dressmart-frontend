import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import Breadcrums from '../Components/Breadcrums/Breadcrums';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import ReleatedProduct from '../Components/ReleatedProduct/ReleatedProduct';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';

const Product = () => {
  const { id } = useParams();
  const { all_products } = useContext(ShopContext);

  // Debug logs
  console.log("All products:", all_products);
  console.log("URL id:", id);

  // Show loading while products are still fetching
  if (!all_products || all_products.length === 0) {
    return <div>Loading...</div>;
  }

  // Find product by MongoDB _id or custom id
  const selectedProduct = all_products.find(item =>
    String(item._id) === id || String(item.id) === id
  );

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Breadcrums product={selectedProduct} />
      <ProductDisplay product={selectedProduct} />
      <DescriptionBox />
      <ReleatedProduct />
    </div>
  );
};

export default Product;
