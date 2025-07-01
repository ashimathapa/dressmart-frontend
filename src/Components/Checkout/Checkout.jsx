import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Checkout.css';
import { ShopContext } from '../../Context/ShopContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
    const { 
        cartItems, 
        all_products,
        clearCart, 
        cartTotalAmount,
        updateQuantity,
        removeFromCart
    } = useContext(ShopContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('auth-token');
            if (!token) {
                toast.info('Please login to proceed to checkout');
                navigate('/login', { 
                    state: { 
                        from: location.pathname,
                        message: 'You need to login to complete your purchase'
                    } 
                });
                return false;
            }
            setIsAuthenticated(true);
            setAuthChecked(true);
            return true;
        };

        if (!authChecked) {
            checkAuth();
        }
    }, [navigate, location, authChecked]);

    const cartProducts = Object.entries(cartItems)
        .filter(([id, quantity]) => quantity > 0)
        .map(([id, quantity]) => {
            const product = all_products.find(p => p.id.toString() === id.toString());
            return product ? { ...product, quantity } : null;
        })
        .filter(Boolean);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phoneNumber: '',
        paymentMethod: '',
        cardNumber: '',
        cardExpiry: '',
        cardCvc: ''
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showCardDetails, setShowCardDetails] = useState(false);

    const shippingFee = 100.00;
    const totalAmountWithShipping = (parseFloat(cartTotalAmount || 0) + shippingFee).toFixed(2);

    const validateForm = () => {
        const newErrors = {};
        
        const requiredFields = {
            firstName: 'First name is required',
            lastName: 'Last name is required',
            email: 'Valid email is required',
            street: 'Street address is required',
            city: 'City is required',
            state: 'State is required',
            zipCode: 'Zip code is required',
            country: 'Country is required',
            phoneNumber: 'Phone number is required',
            paymentMethod: 'Payment method is required'
        };

        Object.entries(requiredFields).forEach(([field, message]) => {
            if (!formData[field]?.trim()) {
                newErrors[field] = message;
            }
        });

        if (formData.email && !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (formData.paymentMethod === 'creditCard') {
            if (!formData.cardNumber.match(/^\d{16}$/)) {
                newErrors.cardNumber = 'Valid 16-digit card number required';
            }
            if (!formData.cardExpiry.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) {
                newErrors.cardExpiry = 'MM/YY format required';
            }
            if (!formData.cardCvc.match(/^\d{3}$/)) {
                newErrors.cardCvc = '3-digit CVC required';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        let formattedValue = value;
        if (name === 'cardNumber') {
            formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
        }
        else if (name === 'cardExpiry' && value.length === 2 && !formData.cardExpiry.includes('/')) {
            formattedValue = value + '/';
        }

        setFormData(prev => ({ 
            ...prev, 
            [name]: formattedValue 
        }));
        
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }

        if (name === 'paymentMethod') {
            setShowCardDetails(value === 'creditCard');
        }
    };

    const handleQuantityChange = (productId, change) => {
        const currentItem = cartProducts.find(item => item.id === productId);
        const newQuantity = currentItem.quantity + change;

        if (newQuantity < 1) {
            removeFromCart(productId);
            toast.info('Item removed from cart');
        } else if (newQuantity > (currentItem.stock || 99)) {
            toast.warning(`Only ${currentItem.stock || 99} available in stock`);
        } else {
            updateQuantity(productId, newQuantity);
        }
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error('Please fix the form errors');
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem('auth-token');
            if (!token) {
                throw new Error('Authentication expired. Please login again.');
            }

            const orderData = {
                items: cartProducts.map(item => ({
                    productId: item.id,
                    name: item.name,
                    image: item.image,
                    price: item.new_price,
                    quantity: item.quantity
                })),
                shippingInfo: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    address: formData.street,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode,
                    country: formData.country,
                    phone: formData.phoneNumber
                },
                paymentInfo: {
                    method: formData.paymentMethod,
                    status: 'Pending',
                    ...(formData.paymentMethod === 'creditCard' && {
                        cardLast4: formData.cardNumber.slice(-4),
                        cardExpiry: formData.cardExpiry
                    })
                },
                totalAmount: parseFloat(totalAmountWithShipping)
            };

            const response = await fetch('http://localhost:5000/placeorder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify(orderData)
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Failed to place order');
            }

            if (clearCart && typeof clearCart === 'function') {
                clearCart();
            }

            toast.success('Order placed successfully!');
            navigate(`/orders/${data.orderId}`, { 
                state: { 
                    orderSuccess: true,
                    orderId: data.orderId 
                } 
            });

        } catch (error) {
            console.error('Order Error:', error);
            toast.error(error.message || 'Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!authChecked) {
        return (
            <div className="auth-check-loading">
                <div className="spinner"></div>
                <p>Verifying your session...</p>
            </div>
        );
    }

    if (cartProducts.length === 0) {
        return (
            <div className="empty-cart-container">
                <div className="empty-cart">
                    <img src="/images/empty-cart.png" alt="Empty cart" />
                    <h2>Your shopping cart is empty</h2>
                    <p>Looks like you haven't added anything to your cart yet</p>
                    <button 
                        onClick={() => navigate('/shop')} 
                        className="continue-shopping-btn"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="checkout-header">
                <h1>Checkout</h1>
                <div className="checkout-steps">
                    <span className="active">1. Delivery</span>
                    <span>2. Payment</span>
                    <span>3. Confirmation</span>
                </div>
            </div>

            <div className="checkout-container">
                <div className="checkout-form-section">
                    <section className="delivery-section">
                        <h2>Delivery Information</h2>
                        <form onSubmit={handlePlaceOrder} noValidate>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name *</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className={errors.firstName ? 'error' : ''}
                                        placeholder="John"
                                    />
                                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name *</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className={errors.lastName ? 'error' : ''}
                                        placeholder="Doe"
                                    />
                                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={errors.email ? 'error' : ''}
                                    placeholder="john@example.com"
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="street">Street Address *</label>
                                <input
                                    type="text"
                                    id="street"
                                    name="street"
                                    value={formData.street}
                                    onChange={handleInputChange}
                                    className={errors.street ? 'error' : ''}
                                    placeholder="123 Main St"
                                />
                                {errors.street && <span className="error-message">{errors.street}</span>}
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="city">City *</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className={errors.city ? 'error' : ''}
                                        placeholder="Kathmandu"
                                    />
                                    {errors.city && <span className="error-message">{errors.city}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="state">State/Province *</label>
                                    <input
                                        type="text"
                                        id="state"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className={errors.state ? 'error' : ''}
                                        placeholder="Bagmati"
                                    />
                                    {errors.state && <span className="error-message">{errors.state}</span>}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="zipCode">Zip/Postal Code *</label>
                                    <input
                                        type="text"
                                        id="zipCode"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        className={errors.zipCode ? 'error' : ''}
                                        placeholder="44600"
                                    />
                                    {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="country">Country *</label>
                                    <select
                                        id="country"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className={errors.country ? 'error' : ''}
                                    >
                                        <option value="">Select Country</option>
                                        <option value="Nepal">Nepal</option>
                                        <option value="India">India</option>
                                        <option value="USA">United States</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="Canada">Canada</option>
                                        <option value="Australia">Australia</option>
                                    </select>
                                    {errors.country && <span className="error-message">{errors.country}</span>}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone Number *</label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    className={errors.phoneNumber ? 'error' : ''}
                                    placeholder="98XXXXXXXX"
                                />
                                {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
                            </div>

                            <section className="payment-section">
                                <h2>Payment Method</h2>
                                <div className={`payment-options ${errors.paymentMethod ? 'error-field' : ''}`}>
                                    <label className="payment-option">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="creditCard"
                                            onChange={handleInputChange}
                                            checked={formData.paymentMethod === 'creditCard'}
                                        />
                                        <div className="payment-content">
                                            <span className="payment-icon">💳</span>
                                            <span>Credit/Debit Card</span>
                                        </div>
                                    </label>
                                    <label className="payment-option">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cash"
                                            onChange={handleInputChange}
                                            checked={formData.paymentMethod === 'cash'}
                                        />
                                        <div className="payment-content">
                                            <span className="payment-icon">💵</span>
                                            <span>Cash on Delivery</span>
                                        </div>
                                    </label>
                                </div>
                                {errors.paymentMethod && <span className="error-message">{errors.paymentMethod}</span>}

                                {showCardDetails && (
                                    <div className="card-details">
                                        <div className="form-group">
                                            <label htmlFor="cardNumber">Card Number *</label>
                                            <input
                                                type="text"
                                                id="cardNumber"
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={handleInputChange}
                                                className={errors.cardNumber ? 'error' : ''}
                                                placeholder="1234 5678 9012 3456"
                                                maxLength="19"
                                            />
                                            {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label htmlFor="cardExpiry">Expiry Date *</label>
                                                <input
                                                    type="text"
                                                    id="cardExpiry"
                                                    name="cardExpiry"
                                                    value={formData.cardExpiry}
                                                    onChange={handleInputChange}
                                                    className={errors.cardExpiry ? 'error' : ''}
                                                    placeholder="MM/YY"
                                                    maxLength="5"
                                                />
                                                {errors.cardExpiry && <span className="error-message">{errors.cardExpiry}</span>}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="cardCvc">CVC *</label>
                                                <input
                                                    type="text"
                                                    id="cardCvc"
                                                    name="cardCvc"
                                                    value={formData.cardCvc}
                                                    onChange={handleInputChange}
                                                    className={errors.cardCvc ? 'error' : ''}
                                                    placeholder="123"
                                                    maxLength="3"
                                                />
                                                {errors.cardCvc && <span className="error-message">{errors.cardCvc}</span>}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </section>

                            <button 
                                type="submit" 
                                className="place-order-btn"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner"></span>
                                        Processing Order...
                                    </>
                                ) : (
                                    `Pay Rs ${totalAmountWithShipping}`
                                )}
                            </button>
                        </form>
                    </section>
                </div>

                <div className="order-summary-section">
                    <div className="order-summary-container">
                        <h2>Order Summary</h2>
                        <div className="order-items">
                            {cartProducts.map((item) => (
                                <div key={item.id} className="order-item">
                                    <div className="item-image">
                                        <img src={item.image || '/images/product-placeholder.jpg'} alt={item.name} />
                                        <span className="item-quantity">{item.quantity}</span>
                                    </div>
                                    <div className="item-details">
                                        <h4>{item.name}</h4>
                                        <p className="item-price">Rs {item.new_price.toFixed(2)}</p>
                                        <div className="item-actions">
                                            <button 
                                                onClick={() => handleQuantityChange(item.id, -1)}
                                                aria-label="Decrease quantity"
                                            >
                                                −
                                            </button>
                                            <button 
                                                onClick={() => handleQuantityChange(item.id, 1)}
                                                disabled={item.quantity >= (item.stock || 99)}
                                                aria-label="Increase quantity"
                                            >
                                                +
                                            </button>
                                            <button 
                                                onClick={() => removeFromCart(item.id)}
                                                className="remove-item"
                                                aria-label="Remove item"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="order-totals">
                            <div className="total-row">
                                <span>Subtotal</span>
                                <span>Rs {parseFloat(cartTotalAmount).toFixed(2)}</span>
                            </div>
                            <div className="total-row">
                                <span>Shipping</span>
                                <span>Rs {shippingFee.toFixed(2)}</span>
                            </div>
                            <div className="total-row grand-total">
                                <span>Total</span>
                                <span>Rs {totalAmountWithShipping}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout