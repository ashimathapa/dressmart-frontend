import React, { useContext, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import { FaTrash, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartItems = () => {
  const {
    cartItems,
    cartTotalAmount,
    removeFromCart,
    updateQuantity,
    applyDiscount,
    discountApplied,
    all_products
  } = useContext(ShopContext);

  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const shippingFee = 100.00;
  const subtotal = parseFloat(cartTotalAmount || 0).toFixed(2);
  const totalAmountWithShipping = (
    parseFloat(subtotal || 0) + 
    parseFloat(shippingFee || 0) - 
    parseFloat(discountApplied || 0)
  ).toFixed(2);

  // Convert cartItems object to product array with quantity
  const cartProducts = Object.entries(cartItems)
    .filter(([id, quantity]) => quantity > 0)
    .map(([id, quantity]) => {
      const product = all_products.find(p => p.id.toString() === id.toString());
      return product ? { ...product, quantity } : null;
    })
    .filter(Boolean);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      toast.error('Minimum quantity is 1', { autoClose: 1500 });
      return;
    }
    updateQuantity(id, newQuantity);
    toast.info('Quantity updated', { autoClose: 1000 });
  };

  const handleRemoveItem = (id) => {
    const product = cartProducts.find(item => item.id.toString() === id.toString());
    if (product) {
      removeFromCart(id);
      toast.error(`${product.name} removed from cart`, { autoClose: 1500 });
    }
  };

  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      toast.warning('Please enter a promo code', { autoClose: 1500 });
      return;
    }
    applyDiscount(promoCode);
    setPromoCode('');
  };

  if (cartProducts.length === 0) {
    return (
      <div className='cart-container'>
        <h1 className='cart-title'>Your Shopping Cart</h1>
        <div className='empty-cart-message'>
          <p>Your cart is empty</p>
          <button
            className='continue-shopping-btn'
            onClick={() => navigate('/shop')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='cart-container'>
      <h1 className='cart-title'>Your Shopping Cart</h1>

      {/* Cart Items Table */}
      <div className="cart-header">
        <span className='header-product'>Product</span>
        <span className='header-price'>Price</span>
        <span className='header-quantity'>Quantity</span>
        <span className='header-total'>Total</span>
        <span className='header-remove'>Remove</span>
      </div>

      <div className="cart-items">
        {cartProducts.map((product) => (
          <div key={product.id} className="cart-item">
            <div className="item-product">
              <img
                src={product.image}
                alt={product.name}
                className='product-image'
                onClick={() => navigate(`/product/${product.id}`)}
              />
              <div className="product-details">
                <h3>{product.name}</h3>
                <p className="product-category">
                  {product.gender === 'women' ? "Women's" :
                    product.gender === 'men' ? "Men's" : "Kids'"} {product.category}
                </p>
                <p className="product-size">Size: {product.size || 'One Size'}</p>
              </div>
            </div>
            <div className="item-price">
              Rs{product.new_price.toFixed(2)}
            </div>
            <div className="item-quantity">
              <button
                onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                aria-label="Decrease quantity"
                disabled={product.quantity <= 1}
              >
                <FaChevronDown />
              </button>
              <span>{product.quantity}</span>
              <button
                onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                aria-label="Increase quantity"
              >
                <FaChevronUp />
              </button>
            </div>
            <div className="item-total">
              Rs{(product.new_price * product.quantity).toFixed(2)}
            </div>
            <button
              className="item-remove"
              onClick={() => handleRemoveItem(product.id)}
              aria-label="Remove item"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="cart-summary">
        <div className="summary-section">
          <h2>Cart Summary</h2>
          <div className="summary-row">
            <span>Subtotal ({cartProducts.length} {cartProducts.length > 1 ? 'items' : 'item'})</span>
            <span>Rs{subtotal}</span>
          </div>

          {discountApplied > 0 && (
            <div className="summary-row discount">
              <span>Discount Applied</span>
              <span>-Rs{discountApplied.toFixed(2)}</span>
            </div>
          )}

          <div className="summary-row">
            <span>Shipping</span>
            <span>Rs{shippingFee.toFixed(2)}</span>
          </div>

          <div className="summary-row total">
            <span>Order Total</span>
            <span>Rs{totalAmountWithShipping}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={() => navigate('/checkout')}  /* Fixed typo here */
          >
            Proceed to Checkout
          </button>
        </div>

        {/* Promo Code Section */}
        <div className="promo-section">
          <h3>Have a Promo Code?</h3>
          <div className="promo-input-group">
            <input
              type="text"
              placeholder="Enter promo code"
              className="promo-input"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button
              className="promo-btn"
              onClick={handleApplyPromo}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;