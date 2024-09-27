import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaShoppingCart } from 'react-icons/fa';
import { ShopContext } from '../../Context/ShopContext';
import logo from '../Assets/logo.jpeg';

const Navbar = () => {
  const { cartItems } = useContext(ShopContext);
  const [active, setActive] = useState('Shop');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('auth-token'));
  // Calculate total items in the cart
  const totalItemsInCart = Object.values(cartItems).reduce((acc, item) => acc + item, 0);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    setIsAuthenticated(false);
    window.location.replace('/'); // Using navigate instead of window.location.replace
  };

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
        <p>FLORAL SHOP</p>
      </div>
      <ul className="nav-menu">
        <li className={active === 'Shop' ? 'active' : ''}>
          <Link to="/" onClick={() => setActive('Shop')} style={{ textDecoration: 'none' }}>Shop</Link>
        </li>
        <li className={active === 'Birthday' ? 'active' : ''}>
          <Link to="/birthday" onClick={() => setActive('Birthday')} style={{ textDecoration: 'none' }}>Birthday</Link>
        </li>
        <li className={active === 'Occasion' ? 'active' : ''}>
          <Link to="/occasion" onClick={() => setActive('Occasion')} style={{ textDecoration: 'none' }}>Occasion</Link>
        </li>
        <li className={active === 'Sympathy' ? 'active' : ''}>
          <Link to="/sympathy" onClick={() => setActive('Sympathy')} style={{ textDecoration: 'none' }}>Sympathy</Link>
        </li>    
        <li className={active === 'Gift' ? 'active' : ''}>
          <Link to="/gift" onClick={() => setActive('Gift')} style={{ textDecoration: 'none' }}>Gift</Link>
        </li> 
      </ul>
      <div className="nav-login-cart">
        {isAuthenticated ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to='/login' style={{ textDecoration: 'none' }}>
            <button>Login</button>
          </Link>
        )}
        <Link to="/cart" className={`cart-icon ${active === 'Cart' ? 'active' : ''}`} onClick={() => setActive('Cart')} style={{ textDecoration: 'none' }}>
          <FaShoppingCart size={30} />
          <span className="cart-count">{totalItemsInCart}</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
