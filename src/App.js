import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import CartItems from './Components/CartIems/CartItems';
import LoginSignup from './Pages/LoginSignup';
import ShopContextProvider from './Context/ShopContext';
import Checkout from './Components/Checkout/Checkout';
import OrderDetails from './Components/OrderDetails/OrderDetails';
import CustomerOrderStatus from './Components/CustomerOrderStatus/CustomerOrderStatus';

 
function App() {
  return (
    <ShopContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/shop" element={<Shop />} />

          {/* Men's Category */}
<Route path="/mens" element={<ShopCategory gender="men" />} />
<Route path="/mens/t-shirts" element={<ShopCategory gender="men" category="Topwear" subcategory="T-Shirts" />} />
<Route path="/mens/shirts" element={<ShopCategory gender="men" category="Topwear" subcategory="Shirts" />} />
<Route path="/mens/jackets" element={<ShopCategory gender="men" category="Topwear" subcategory="Jackets" />} />
<Route path="/mens/sweaters" element={<ShopCategory gender="men" category="Topwear" subcategory="Sweaters" />} />
<Route path="/mens/jeans" element={<ShopCategory gender="men" category="Bottomwear" subcategory="Jeans" />} />
<Route path="/mens/trousers" element={<ShopCategory gender="men" category="Bottomwear" subcategory="Trousers" />} />
<Route path="/mens/shorts" element={<ShopCategory gender="men" category="Bottomwear" subcategory="Shorts" />} />
<Route path="/mens/track-pants" element={<ShopCategory gender="men" category="Bottomwear" subcategory="Track Pants" />} />
<Route path="/mens/casual-shoes" element={<ShopCategory gender="men" category="Footwear" subcategory="Casual Shoes" />} />
<Route path="/mens/sports-shoes" element={<ShopCategory gender="men" category="Footwear" subcategory="Sports Shoes" />} />
<Route path="/mens/sandals" element={<ShopCategory gender="men" category="Footwear" subcategory="Sandals" />} />
<Route path="/mens/socks" element={<ShopCategory gender="men" category="Footwear" subcategory="Socks" />} />
<Route path="/mens/belts" element={<ShopCategory gender="men" category="Accessories" subcategory="Belts" />} />
<Route path="/mens/caps-hats" element={<ShopCategory gender="men" category="Accessories" subcategory="Caps & Hats" />} />
<Route path="/mens/wallets" element={<ShopCategory gender="men" category="Accessories" subcategory="Wallets" />} />

{/* Women's Category */}
<Route path="/womens" element={<ShopCategory gender="women" />} />
<Route path="/womens/kurtas" element={<ShopCategory gender="women" category="Indian Wear" subcategory="Kurtas" />} />
<Route path="/womens/sarees" element={<ShopCategory gender="women" category="Indian Wear" subcategory="Sarees" />} />
<Route path="/womens/lehenga-choli" element={<ShopCategory gender="women" category="Indian Wear" subcategory="Lehenga Choli" />} />
<Route path="/womens/dupattas" element={<ShopCategory gender="women" category="Indian Wear" subcategory="Dupattas" />} />
<Route path="/womens/tops" element={<ShopCategory gender="women" category="Topwear" subcategory="Tops" />} />
<Route path="/womens/blouses" element={<ShopCategory gender="women" category="Topwear" subcategory="Blouses" />} />
<Route path="/womens/jumpsuits" element={<ShopCategory gender="women" category="Topwear" subcategory="Jumpsuits" />} />
<Route path="/womens/skirts" element={<ShopCategory gender="women" category="Topwear" subcategory="Skirts" />} />
<Route path="/womens/dresses" element={<ShopCategory gender="women" category="Dresses" subcategory="Dresses" />} />
<Route path="/womens/formal-dresses" element={<ShopCategory gender="women" category="Dresses" subcategory="Formal Dresses" />} />
<Route path="/womens/heels" element={<ShopCategory gender="women" category="Footwear" subcategory="Heels" />} />
<Route path="/womens/flats" element={<ShopCategory gender="women" category="Footwear" subcategory="Flats" />} />
<Route path="/womens/sneakers" element={<ShopCategory gender="women" category="Footwear" subcategory="Sneakers" />} />
<Route path="/womens/boots" element={<ShopCategory gender="women" category="Footwear" subcategory="Boots" />} />
<Route path="/womens/handbags" element={<ShopCategory gender="women" category="Accessories" subcategory="Handbags" />} />
<Route path="/womens/sunglasses" element={<ShopCategory gender="women" category="Accessories" subcategory="Sunglasses" />} />
<Route path="/womens/jewellery" element={<ShopCategory gender="women" category="Accessories" subcategory="Jewellery" />} />

{/* Kids Category */}
<Route path="/kids" element={<ShopCategory gender="kids" />} />
<Route path="/kids/t-shirts" element={<ShopCategory gender="kids" category="Boys Clothing" subcategory="T-Shirts" />} />
<Route path="/kids/shirts" element={<ShopCategory gender="kids" category="Boys Clothing" subcategory="Shirts" />} />
<Route path="/kids/shorts" element={<ShopCategory gender="kids" category="Boys Clothing" subcategory="Shorts" />} />
<Route path="/kids/jeans" element={<ShopCategory gender="kids" category="Boys Clothing" subcategory="Jeans" />} />
<Route path="/kids/jackets" element={<ShopCategory gender="kids" category="Boys Clothing" subcategory="Jackets" />} />
<Route path="/kids/dresses" element={<ShopCategory gender="kids" category="Girls Clothing" subcategory="Dresses" />} />
<Route path="/kids/tops" element={<ShopCategory gender="kids" category="Girls Clothing" subcategory="Tops" />} />
<Route path="/kids/lehenga" element={<ShopCategory gender="kids" category="Girls Clothing" subcategory="Lehenga" />} />
<Route path="/kids/jumpsuits" element={<ShopCategory gender="kids" category="Girls Clothing" subcategory="Jumpsuits" />} />
<Route path="/kids/skirts" element={<ShopCategory gender="kids" category="Girls Clothing" subcategory="Skirts" />} />
<Route path="/kids/sandals" element={<ShopCategory gender="kids" category="Footwear" subcategory="Sandals" />} />
<Route path="/kids/shoes" element={<ShopCategory gender="kids" category="Footwear" subcategory="Shoes" />} />
<Route path="/kids/socks" element={<ShopCategory gender="kids" category="Footwear" subcategory="Socks" />} />
<Route path="/kids/soft-toys" element={<ShopCategory gender="kids" category="Toys" subcategory="Soft Toys" />} />
<Route path="/kids/action-figures" element={<ShopCategory gender="kids" category="Toys" subcategory="Action Figures" />} />
<Route path="/kids/bodysuits" element={<ShopCategory gender="kids" category="Infants" subcategory="Bodysuits" />} />
<Route path="/kids/rompers" element={<ShopCategory gender="kids" category="Infants" subcategory="Rompers" />} />
<Route path="/kids/infant-care" element={<ShopCategory gender="kids" category="Infants" subcategory="Infant Care" />} />
<Route path="/kids/bags" element={<ShopCategory gender="kids" category="Accessories" subcategory="Bags" />} />
<Route path="/kids/sunglasses" element={<ShopCategory gender="kids" category="Accessories" subcategory="Sunglasses" />} />
          {/* Product detail */}
          <Route path="/product/:id" element={<Product />} />

          {/* Cart and Orders */}
          <Route path="/cart" element={<CartItems />} />
          <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />

          {/* Auth */}
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/signup" element={<LoginSignup />} />
          <Route path="/customer-orderstatus" element={<CustomerOrderStatus />} />

          {/* 404 Fallback */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ShopContextProvider>
  );
}

export default App;
