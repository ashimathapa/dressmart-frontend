import React from 'react';
import './Breadcrums.css';
import { FaChevronRight } from 'react-icons/fa'; // Import the arrow icon

const Breadcrums = (props) => {
    const { product } = props;

    return (
        <div className='breadcrums'>
            HOME <FaChevronRight />
            SHOP <FaChevronRight />
            {product.category} <FaChevronRight />
            {product.name}
        </div>
    );
};

export default Breadcrums;
