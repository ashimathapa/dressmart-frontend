import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import { FaTrash } from 'react-icons/fa';

const CartItems = () => {
    const { getTotalCartAmount, all_flower, cartItems, removeFromCart } = useContext(ShopContext);

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Flowers</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_flower.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format">
                                <img src={e.image} alt="" className='carticon-flower-icon' />
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>${(e.new_price * cartItems[e.id]).toFixed(2)}</p>
                                <FaTrash 
                                    onClick={() => removeFromCart(e.id)} 
                                    style={{ cursor: 'pointer', color: 'red' }} 
                                />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, enter it here:</p>
                    <div className="cartitems-promobox">
                        <div className="promo-input-container">
                            <input type="text" placeholder="Promo code" />
                        </div>
                        <div className="promo-button-container">
                            <button type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItems;
