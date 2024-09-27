import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import FlowerDisplay from '../Components/FlowerDisplay/FlowerDisplay';
import Breadcrums from '../Components/Breadcrums/Breadcrums';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import ReleatedProduct from '../Components/ReleatedProduct/ReleatedProduct';

const Flower = () => {
  const { flowerID } = useParams(); // Get the flowerID from the URL
  const { all_flower } = useContext(ShopContext);

  // Check if all_flower is defined
  if (!all_flower) {
    return <div>Loading...</div>; // Handle loading or undefined state
  }

  // Find the flower by ID
  const flower = all_flower.find(item => item.id === parseInt(flowerID));

  // If the flower is not found, you might want to handle that case
  if (!flower) {
    return <div>Flower not found</div>; // Optionally show a message if not found
  }

  return (
    <div>
      <Breadcrums flower={flower} />
      <FlowerDisplay flower={flower} />
      <DescriptionBox/>
      <ReleatedProduct/>
    </div>
  );
};

export default Flower;
