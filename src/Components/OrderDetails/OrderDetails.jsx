import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './OrderDetails.css';

const OrderDetails = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('auth-token');
                if (!token) {
                    throw new Error('Please login to view order details');
                }

                const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
                    headers: {
                        'auth-token': token
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch order details');
                }

                const data = await response.json();
                
                if (!data.success || !data.order) {
                    throw new Error(data.message || 'Order not found');
                }

                setOrder(data.order);
            } catch (err) {
                console.error('Error fetching order:', err);
                setError(err.message);
                toast.error(err.message || 'Failed to load order details');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) {
        return (
            <div className="order-details-loading">
                <div className="spinner"></div>
                <p>Loading order details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="order-details-error">
                <p>{error}</p>
                <button onClick={() => navigate('/orders')} className="back-button">
                    Back to Orders
                </button>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="order-details-error">
                <p>Order not found</p>
                <button onClick={() => navigate('/orders')} className="back-button">
                    Back to Orders
                </button>
            </div>
        );
    }

    return (
        <div className="order-details-container">
            <div className="order-header">
                <h1>Order Details</h1>
                <p className="order-id">Order #: {order._id}</p>
                <p className="order-date">Placed on: {formatDate(order.orderDate)}</p>
                <div className={`order-status ${order.status.toLowerCase()}`}>
                    Status: {order.status}
                </div>
            </div>

            <div className="order-content">
                <div className="order-section shipping-info">
                    <h2>Shipping Information</h2>
                    <div className="info-grid">
                        <div>
                            <h3>Address</h3>
                            <p>{order.shippingInfo.address}</p>
                            <p>{order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}</p>
                            <p>{order.shippingInfo.country}</p>
                        </div>
                        <div>
                            <h3>Contact</h3>
                            <p>{order.shippingInfo.firstName} {order.shippingInfo.lastName}</p>
                            <p>{order.shippingInfo.email}</p>
                            <p>Phone: {order.shippingInfo.phone}</p>
                        </div>
                    </div>
                </div>

                <div className="order-section payment-info">
                    <h2>Payment Information</h2>
                    <div className="info-grid">
                        <div>
                            <h3>Method</h3>
                            <p>{order.paymentInfo.method === 'creditCard' ? 'Credit/Debit Card' : 'Cash on Delivery'}</p>
                            {order.paymentInfo.method === 'creditCard' && order.paymentInfo.cardLast4 && (
                                <p>Card ending in ****{order.paymentInfo.cardLast4}</p>
                            )}
                        </div>
                        <div>
                            <h3>Payment Status</h3>
                            <p>{order.paymentInfo.status || 'Pending'}</p>
                        </div>
                    </div>
                </div>

                <div className="order-section items-list">
                    <h2>Order Items</h2>
                    <div className="items-grid">
                        {order.items.map((item, index) => (
                            <div key={index} className="order-item">
                                <div className="item-image">
                                    <img 
                                        src={item.image} 
                                        alt={item.name}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/images/placeholder-product.png';
                                        }}
                                    />
                                </div>
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p>Rs {item.price.toFixed(2)} × {item.quantity}</p>
                                </div>
                                <div className="item-total">
                                    Rs {(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="order-section order-summary">
                    <h2>Order Summary</h2>
                    <div className="summary-grid">
                        <div>
                            <p>Subtotal:</p>
                            <p>Shipping:</p>
                            <p className="total">Total:</p>
                        </div>
                        <div>
                            <p>Rs {(order.totalAmount - (order.shippingFee || 100)).toFixed(2)}</p>
                            <p>Rs {(order.shippingFee || 100).toFixed(2)}</p>
                            <p className="total">Rs {order.totalAmount.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="order-actions">
                <button onClick={() => navigate('/orders')} className="back-button">
                    Back to Orders
                </button>
                {order.status === 'Processing' && (
                    <button className="cancel-button">
                        Cancel Order
                    </button>
                )}
            </div>
        </div>
    );
};

export default OrderDetails;