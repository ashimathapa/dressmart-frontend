import React, { createContext, useState } from 'react'; 
import all_flower from "../Components/Assets/all_flower"; // Ensure this is correctly importing the flower data

export const ShopContext = createContext(null); 

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_flower.length; index++) { // Adjusted to length instead of length + 1
        cart[index] = 0;   
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
     
    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: Math.max(0, prev[itemId] - 1) })); // Prevent negative quantities
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_flower.find((flower) => flower.id === Number(item)); // Corrected reference
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
            }
        }
        return totalAmount; // Moved outside the loop
    }

    const contextValue = { getTotalCartAmount, all_flower, cartItems, setCartItems, addToCart, removeFromCart };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
