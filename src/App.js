import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Flower from './Pages/Flower';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import birthday_banner from './Components/Assets/sympathy.jpg';
import occasion_banner from './Components/Assets/sympathy.jpg';
import sympathy_banner from './Components/Assets/sympathy.jpg';
import gift_banner from './Components/Assets/sympathy.jpg';
import ShopContextProvider from './Context/ShopContext';

function App() {
  return (
    <ShopContextProvider>  {/* ShopContextProvider wraps everything */}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/birthday" element={<ShopCategory banner={birthday_banner} category="birthday" />} />
          <Route path="/occasion" element={<ShopCategory banner={occasion_banner} category="occasion" />} />
          <Route path="/sympathy" element={<ShopCategory banner={sympathy_banner} category="sympathy" />} />
          <Route path="/gift" element={<ShopCategory banner={gift_banner} category="gift" />} />
          <Route path="/flower/:flowerID" element={<Flower />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/Signup" element={<LoginSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ShopContextProvider>
  );
}

export default App;
