import React, { useState, useContext, useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaBars, FaUserShield } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import './Navbar.css';

const Navbar = () => {
  const [showMegaMenu, setShowMegaMenu] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const { cartTotalItems } = useContext(ShopContext);

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    const storedUserData = localStorage.getItem('userData');
    
    setIsAuthenticated(!!token);
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUserData(null);
    window.location.replace('/');
  };

  const handleHover = (menuName) => setShowMegaMenu(menuName);
  const handleLeave = () => setShowMegaMenu('');
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const isAdmin = userData?.roles?.includes('admin');

  return (
    <div className="navbar" onMouseLeave={handleLeave}>
      <h1 className="logo">
        <Link to="/">DRESSMART</Link>
      </h1>

      <button className="menu-toggle" onClick={toggleMobileMenu}>
        <FaBars />
      </button>

      <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <li><Link to="/">Shop</Link></li>
        {/* Men */}
        <li onMouseEnter={() => handleHover('men')}>
          <Link to="/mens">Men</Link>
          {showMegaMenu === 'men' && (
            <div className="mega-menu">
              <div className="column">
                <h4>Topwear</h4>
                <Link to="/mens/t-shirts">T-Shirts</Link>
                <Link to="/mens/shirts">Shirts</Link>
                <Link to="/mens/jackets">Jackets</Link>
                <Link to="/mens/sweaters">Sweaters</Link>
              </div>
              <div className="column">
                <h4>Bottomwear</h4>
                <Link to="/mens/jeans">Jeans</Link>
                <Link to="/mens/trousers">Trousers</Link>
                <Link to="/mens/shorts">Shorts</Link>
                <Link to="/mens/track-pants">Track Pants</Link>
              </div>
              <div className="column">
                <h4>Footwear</h4>
                <Link to="/mens/casual-shoes">Casual Shoes</Link>
                <Link to="/mens/sports-shoes">Sports Shoes</Link>
                <Link to="/mens/sandals">Sandals</Link>
                <Link to="/mens/socks">Socks</Link>
              </div>
              <div className="column">
                <h4>Accessories</h4>
                <Link to="/mens/belts">Belts</Link>
                <Link to="/mens/caps">Caps & Hats</Link>
                <Link to="/mens/wallets">Wallets</Link>
              </div>
            </div>
          )}
        </li>

        {/* Women */}
        <li onMouseEnter={() => handleHover('women')}>
          <Link to="/womens">Women</Link>
          {showMegaMenu === 'women' && (
            <div className="mega-menu">
              <div className="column">
                <h4>IndainWear</h4>
                <Link to="/womens/kurtas">Kurtas</Link>
                <Link to="/womens/sarees">Sarees</Link>
                <Link to="/womens/lehenga-choli">Lehenga Choli</Link>
                <Link to="/womens/dupattas">Dupattas</Link>
              </div>
              <div className="column">
                <h4>Topwear</h4>
                <Link to="/womens/blouses">Blouses</Link>
                <Link to="/womens/tops">Tops</Link>
                <Link to="/womens/jumpsuits">Jumpsuits</Link>
                <Link to="/womens/skirts">Skirts</Link>
              </div>
              <div className="column">
                <h4>Dresses</h4>
                <Link to="/womens/dresses">Dresses</Link>
                <Link to="/womens/formal-dresses">Formal Dresses</Link>
              </div>
              <div className="column">
                <h4>Footwear</h4>
                <Link to="/womens/heels">Heels</Link>
                <Link to="/womens/flats">Flats</Link>
                <Link to="/womens/sneakers">Sneakers</Link>
                <Link to="/womens/boots">Boots</Link>
              </div>
              <div className="column">
                <h4>Accessories</h4>
                <Link to="/womens/handbags">Handbags</Link>
                <Link to="/womens/sunglasses">Sunglasses</Link>
                <Link to="/womens/jewellery">Jewellery</Link>
              </div>
            </div>
          )}
        </li>

        {/* Kids */}
        <li onMouseEnter={() => handleHover('kids')}>
          <Link to="/kids">Kids</Link>
          {showMegaMenu === 'kids' && (
            <div className="mega-menu">
              <div className="column">
                <h4>Boys Clothing</h4>
                <Link to="/kids/t-shirts">T-Shirts</Link>
                <Link to="/kids/shirts">Shirts</Link>
                <Link to="/kids/shorts">Shorts</Link>
                <Link to="/kids/jeans">Jeans</Link>
                <Link to="/kids/jackets">Jackets</Link>
              </div>
              <div className="column">
                <h4>Girls Clothing</h4>
                <Link to="/kids/dresses">Dresses</Link>
                <Link to="/kids/tops">Tops</Link>
                <Link to="/kids/lehenga">Lehenga</Link>
                <Link to="/kids/jumpsuits">Jumpsuits</Link>
                <Link to="/kids/skirts">Skirts</Link>
              </div>
              <div className="column">
                <h4>Footwear</h4>
                <Link to="/kids/sandals">Sandals</Link>
                <Link to="/kids/shoes">Shoes</Link>
                <Link to="/kids/socks">Socks</Link>
              </div>
              <div className="column">
                <h4>Toys</h4>
                <Link to="/kids/soft-toys">Soft Toys</Link>
                <Link to="/kids/action-figures">Action Figures</Link>
              </div>
              <div className="column">
                <h4>Infants</h4>
                <Link to="/kids/bodysuits">Bodysuits</Link>
                <Link to="/kids/rompers">Rompers</Link>
                <Link to="/kids/infant-care">Infant Care</Link>
              </div>
              <div className="column">
                <h4>Accessories</h4>
                <Link to="/kids/bags">Bags</Link>
                <Link to="/kids/sunglasses">Sunglasses</Link>
              </div>
            </div>
          )}
        </li>
      </ul>

      <div className="nav-icons">
        <Link to="/search"><FaSearch className="icon" /></Link>
        
       {isAdmin && (
  <a 
    href="http://localhost:5173/admin" 
    className="admin-link"
    onClick={(e) => {
      e.preventDefault();
      // Encode the token for URL safety
      const token = encodeURIComponent(localStorage.getItem('auth-token'));
      // Redirect with token in URL hash (more secure than query params)
      window.location.href = `http://localhost:5173/admin#token=${token}`;
    }}
  >
    <FaUserShield className="icon" title="Admin Dashboard" />
  </a>
)}
        {isAuthenticated ? (
          <button className="nav-button" onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">
            <button className="nav-button">Login</button>
          </Link>
        )}
        
        <div className="cart-icon-wrapper">
          <Link to="/cart"><FaShoppingCart className="icon" /></Link>
          {cartTotalItems > 0 && (
            <span className="cart-badge">{cartTotalItems}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;