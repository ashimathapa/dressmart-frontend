import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ShopContext = createContext(null);

const getDefaultCart = (products = []) => {
  const cart = {};
  products.forEach(p => {
    cart[p.id.toString()] = 0;
  });
  return cart;
};

const ShopContextProvider = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [discountApplied, setDiscountApplied] = useState(0);

  useEffect(() => {
    // Fetch all products from backend
    fetch('http://localhost:5000/allproducts')
      .then(res => res.json())
      .then(data => {
        const sanitizedData = data.map(product => ({
          ...product,
          id: product.id.toString(),
          colors: Array.isArray(product.colors) ? product.colors : [product.colors || "Black"],
          sizes: Array.isArray(product.sizes) ? product.sizes : [product.sizes || "M"],
        }));
        setAllProducts(sanitizedData);
        setCartItems(getDefaultCart(sanitizedData));
      })
      .catch(err => console.error('Failed to fetch products:', err));

    // Fetch user's cart if logged in
    const authToken = localStorage.getItem('auth-token');
    if (authToken) {
      fetch('http://localhost:5000/getcart', {
        method: 'POST',
        headers: {
          'auth-token': authToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })
      .then(res => res.json())
      .then(data => {
        const normalizedCart = {};
        Object.entries(data).forEach(([key, val]) => {
          normalizedCart[key.toString()] = val;
        });
        setCartItems(normalizedCart);
      })
      .catch(err => console.error('Failed to fetch cart:', err));
    }
  }, []);

  // Add discount functionality
  const applyDiscount = (code) => {
    if (code.toLowerCase() === 'save10') {
      const discount = getTotalCartAmount() * 0.1; // 10% discount
      setDiscountApplied(discount);
      toast.success('Discount applied!');
    } else {
      toast.error('Invalid promo code');
    }
  };

  const addToCart = (itemId) => {
    const key = itemId.toString();
    setCartItems(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
    
    const authToken = localStorage.getItem('auth-token');
    if (authToken) {
      fetch('http://localhost:5000/addtocart', {
        method: 'POST',
        headers: {
          'auth-token': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemId: key }),
      }).catch(err => console.error('Add to cart error:', err));
    }
  };

  const removeFromCart = (itemId) => {
    const key = itemId.toString();
    setCartItems(prev => ({ ...prev, [key]: Math.max(0, (prev[key] || 0) - 1 )}));
    
    const authToken = localStorage.getItem('auth-token');
    if (authToken) {
      fetch('http://localhost:5000/removefromcart', {
        method: 'POST',
        headers: {
          'auth-token': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemId: key }),
      }).catch(err => console.error('Remove from cart error:', err));
    }
  };

  const updateCartItemQuantity = (itemId, quantity) => {
    const key = itemId.toString();
    const validQuantity = Math.max(0, quantity);
    setCartItems(prev => ({ ...prev, [key]: validQuantity }));
    
    const authToken = localStorage.getItem('auth-token');
    if (authToken) {
      fetch('http://localhost:5000/updatecart', {
        method: 'POST',
        headers: {
          'auth-token': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemId: key, quantity: validQuantity }),
      }).catch(err => console.error('Update cart error:', err));
    }
  };

  const clearCart = () => {
    setCartItems(getDefaultCart(allProducts));
    setDiscountApplied(0);
    
    const authToken = localStorage.getItem('auth-token');
    if (authToken) {
      fetch('http://localhost:5000/clearcart', {
        method: 'POST',
        headers: {
          'auth-token': authToken,
          'Content-Type': 'application/json'
        },
      }).catch(err => console.error('Clear cart error:', err));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemKey in cartItems) {
      if (cartItems[itemKey] > 0) {
        const itemInfo = allProducts.find(product => product.id === itemKey);
        if (itemInfo) {
          totalAmount += (itemInfo.new_price || 0) * cartItems[itemKey];
        }
      }
    }
    return totalAmount - discountApplied;
  };

  const getProductById = (id) => {
    const key = id.toString();
    return allProducts.find(product => product.id === key);
  };

  const contextValue = {
    getProductById,
    all_products: allProducts,
    cartItems,
    cartTotalAmount: getTotalCartAmount(),
    addToCart,
    removeFromCart,
    updateQuantity: updateCartItemQuantity,
    clearCart,
    applyDiscount,
    discountApplied,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;