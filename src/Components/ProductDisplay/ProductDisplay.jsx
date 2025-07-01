import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductDisplay.css';
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const { addToCart } = useContext(ShopContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/product/${id}`);
        const data = await res.json();
        if (res.ok && data.success) {
          setProduct(data.product);
        } else {
          setError(data.message || 'Product not found');
        }
      } catch (err) {
        setError('Failed to fetch product');
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product.stock > 0) {
      addToCart(product.id); // Actually add the product to cart
      
      toast.success(`${product.name} added to cart!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setTimeout(() => {
        navigate('/cart');
      }, 2000);
    }
  };

  if (error) {
    return <div className="productdisplay-error">{error}</div>;
  }

  if (!product) {
    return <div className="productdisplay-loading">Loading...</div>;
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        limit={3}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <div className="productdisplay">
        <div className="productdisplay-left">
          <div className="productdisplay-img">
            <img 
              className="productdisplay-main-img" 
              src={product.image} 
              alt={product.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder-image.jpg';
              }}
            />
          </div>
        </div>

        <div className="productdisplay-right">
          <h1>{product.name}</h1>
          <p className="product-category">
            {product.category} • {product.subcategory}
          </p>
          
          <div className="productdisplay-right-prices">
            {product.old_price && (
              <div className="productdisplay-right-price-old">
                Rs{product.old_price.toFixed(2)}
                <span className="discount-badge">
                  {Math.round((1 - product.new_price/product.old_price) * 100)}% OFF
                </span>
              </div>
            )}
            <div className="productdisplay-right-price-new">
              Rs{product.new_price.toFixed(2)}
            </div>
          </div>
          
          <div className="productdisplay-right-colors">
            <p>Colors:</p>
            <div className="color-options">
              {product.colors.map((color, index) => (
                <span 
                  key={index}
                  className="color-circle"
                  style={{ backgroundColor: color }}
                  title={color.charAt(0).toUpperCase() + color.slice(1)}
                />
              ))}
            </div>
          </div>
          
          <div className="productdisplay-right-sizes">
            <p>Sizes:</p>
            <div className="size-options">
              {product.sizes.map((size, index) => (
                <span key={index} className="size-box">
                  {size}
                </span>
              ))}
            </div>
          </div>
          
          <div className="productdisplay-right-stock">
            {product.stock > 0 ? (
              <p className="in-stock">{product.stock} items available</p>
            ) : (
              <p className="out-of-stock">Currently out of stock</p>
            )}
          </div>
          
          <p className="product-date">Date Added: {new Date(product.date).toLocaleDateString()}</p>
          
          <button 
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`add-to-cart-btn ${product.stock <= 0 ? 'disabled' : ''}`}
          >
            {product.stock > 0 ? 'ADD TO CART' : 'OUT OF STOCK'}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDisplay;