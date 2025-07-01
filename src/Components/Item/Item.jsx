import React from 'react';
import { Link } from 'react-router-dom';
import './Item.css';

const Item = (props) => {
  const {
    id,
    image,
    name,
    new_price,
    old_price,
    stock: rawStock = 0,
    subcategory = '',
    colors = [],
    sizes = [],
    onAddToCart, // optional callback for Add to Cart button
  } = props;

  // Convert stock to number safely
  const stock = Number(rawStock) || 0;

  return (
    <div className='item'>
      <Link to={`/product/${id}`} onClick={() => window.scrollTo(0, 0)}>
        <img 
          src={image || 'https://via.placeholder.com/300'} 
          alt={name || 'Product'} 
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300';
          }}
        />
      </Link>
      <p className="item-name">{name || 'Product Name'}</p>
      
      {subcategory && (
        <p className="item-subcategory">
          {subcategory.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ')}
        </p>
      )}
      
      <div className="item-prices">
        <div className="item-price-new">
          Rs {new_price?.toLocaleString() || '0'}
        </div>
        {old_price && old_price > new_price && (
          <div className="item-price-old">
            Rs {old_price.toLocaleString()}
          </div>
        )}
      </div>
      
      <div className="item-details">
        {colors.length > 0 && (
          <div className="item-colors">
            <span>Colors: </span>
            <div className="color-chips">
              {colors.slice(0, 3).map((color, index) => (
                <span 
                  key={index} 
                  className="color-chip"
                  style={{ backgroundColor: color }}
                  title={color}
                  aria-label={`Color: ${color}`}
                  role="img"
                />
              ))}
              {colors.length > 3 && (
                <span className="color-more">+{colors.length - 3}</span>
              )}
            </div>
          </div>
        )}
        
        {sizes.length > 0 && (
          <div className="item-sizes">
            <span>Sizes: </span>
            <div className="size-bubbles">
              {sizes.map((size, index) => (
                <span key={index} className="size-bubble">
                  {size}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <p className={`stock-info ${stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
          {stock > 0 
            ? `${stock} item${stock > 1 ? 's' : ''} in stock` 
            : 'Out of stock'}
        </p>
      </div>

      {/* Optional Add to Cart button */}
      {onAddToCart && (
        <button
          className="add-to-cart-btn"
          disabled={stock === 0}
          onClick={() => onAddToCart(id)}
        >
          {stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      )}
    </div>
  );
};

export default Item;
