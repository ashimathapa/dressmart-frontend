import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Item from '../Components/Item/Item';
import '../Pages/CSS/ShopCategory.css';
import Hero from '../Components/Hero/Hero';

const ShopCategory = ({ gender, category, subcategory }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('featured');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/allproducts'); 
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error('Invalid data format');
        setProducts(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // FILTER PRODUCTS BY GENDER (mandatory), THEN category & subcategory if provided
  const filteredProducts = products.filter(product => {
    const matchesGender = gender
      ? product.gender?.toLowerCase() === gender.toLowerCase()
      : true;
    const matchesCategory = category
      ? product.category?.toLowerCase() === category.toLowerCase()
      : true;
    const matchesSubcategory = subcategory
      ? product.subcategory?.toLowerCase() === subcategory.toLowerCase()
      : true;
    return matchesGender && matchesCategory && matchesSubcategory;
  });

  // Sort filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-low':
        return a.new_price - b.new_price;
      case 'price-high':
        return b.new_price - a.new_price;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  // Format display names
  const formatGenderName = (g) => {
    if (!g) return '';
    return g === 'men' ? "Men's" :
           g === 'women' ? "Women's" :
           g === 'kids' ? "Kids'" :
           g;
  };

  const formatCategoryName = (cat) => {
    if (!cat) return '';
    return cat.split(/[-_ ]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const formatSubcategoryName = (subcat) => {
    if (!subcat) return '';
    return subcat.split(/[-_ ]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  if (loading) return <p className="loading">Loading products...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="shop-category">
      <Hero />
      <div className="category-container">
        <div className="category-header">
          <h2>
            {formatGenderName(gender)}
            {category && ` ${formatCategoryName(category)}`}
            {subcategory && ` > ${formatSubcategoryName(subcategory)}`}
          </h2>
          <div className="sort-options">
            <label htmlFor="sort">Sort by:</label>
            <select 
              id="sort" 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {sortedProducts.length > 0 ? (
          <div className="product-grid">
            {sortedProducts.map(item => (
              <Item
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
                stock={item.stock}
                subcategory={item.subcategory}
                colors={item.colors}
                sizes={item.sizes}
              />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <p>No products available in this category</p>
            <button 
              className="continue-shopping"
              onClick={() => navigate('/shop')}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopCategory;
