import React from 'react';
import './Breadcrums.css';
import { FaChevronRight } from 'react-icons/fa'; // Import the arrow icon

const Breadcrums = (props) => {
    const { flower } = props;

    return (
        <div className='breadcrums'>
            HOME <FaChevronRight />
            SHOP <FaChevronRight />
            {flower.category} <FaChevronRight />
            {flower.name}
        </div>
    );
};

export default Breadcrums;
