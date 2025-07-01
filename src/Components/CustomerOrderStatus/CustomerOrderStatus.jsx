import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CustomerOrderStatus.css';

const CustomerOrderStatus = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Format currency with "Rs" prefix
  const formatCurrency = (amount) => {
    return `Rs ${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  // Get order details
  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch order');
      
      const data = await response.json();
      setOrder(data.order);
      setError(null);
    } catch (err) {
      setError(err.message);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  // Poll for status updates every 30 seconds
  useEffect(() => {
    if (!orderId) return;
    
    fetchOrder();
    const interval = setInterval(fetchOrder, 30000);
    return () => clearInterval(interval);
  }, [orderId]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'processing': return 'status-processing';
      case 'shipped': return 'status-shipped';
      case 'delivered': return 'status-delivered';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-default';
    }
  };

  if (loading) return <div className="loading">Loading order details...</div>;
  
  if (error) return <div className="error-message">{error}</div>;
  
  if (!order) return <div className="no-order">No order found</div>;

  return (
    <div className="customer-order-status">
      <h1>Your Order Details</h1>
      
      <div className="order-details-container">
        <div className="order-summary">
          <h2>Order #{order._id.substring(0, 8)}</h2>
          <div className="order-meta">
            <p><strong>Order Date:</strong> {formatDate(order.orderDate)}</p>
            <p><strong>Status:</strong> 
              <span className={`status-badge ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </p>
            <p><strong>Total Amount:</strong> {formatCurrency(order.totalAmount)}</p>
            <p><strong>Shipping Fee:</strong> {formatCurrency(order.shippingFee)}</p>
            <p><strong>Payment Method:</strong> {order.paymentInfo.method === 'creditCard' ? 'Credit Card' : 'Cash'}</p>
            {order.paymentInfo.method === 'creditCard' && (
              <p><strong>Card:</strong> **** **** **** {order.paymentInfo.cardLast4}</p>
            )}
          </div>
        </div>

        <div className="status-timeline">
          <h3>Order Status Timeline</h3>
          <div className="timeline-steps">
            <div className={`timeline-step ${order.status === 'Processing' ? 'active' : ''} ${['Shipped', 'Delivered'].includes(order.status) ? 'completed' : ''}`}>
              <div className="step-marker"></div>
              <div className="step-details">
                <p>Processing</p>
                <small>{formatDate(order.orderDate)}</small>
              </div>
            </div>
            
            <div className={`timeline-step ${order.status === 'Shipped' ? 'active' : ''} ${order.status === 'Delivered' ? 'completed' : ''}`}>
              <div className="step-marker"></div>
              <div className="step-details">
                <p>Shipped</p>
                {order.status === 'Shipped' && <small>{formatDate(order.updatedAt)}</small>}
              </div>
            </div>
            
            <div className={`timeline-step ${order.status === 'Delivered' ? 'active' : ''}`}>
              <div className="step-marker"></div>
              <div className="step-details">
                <p>Delivered</p>
                {order.status === 'Delivered' && <small>{formatDate(order.updatedAt)}</small>}
              </div>
            </div>
          </div>
        </div>

        <div className="order-items">
          <h3>Your Items</h3>
          {order.items.map((item, index) => (
            <div key={index} className="order-item">
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-details">
                <h4>{item.name}</h4>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {formatCurrency(item.price)} each</p>
                <p>Subtotal: {formatCurrency(item.price * item.quantity)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="shipping-details">
          <h3>Shipping Information</h3>
          <div className="shipping-address">
            <p><strong>{order.shippingInfo.firstName} {order.shippingInfo.lastName}</strong></p>
            <p>{order.shippingInfo.address}</p>
            <p>{order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}</p>
            <p>{order.shippingInfo.country}</p>
            <p>Email: {order.shippingInfo.email}</p>
            <p>Phone: {order.shippingInfo.phone}</p>
          </div>
        </div>

        <div className="payment-details">
          <h3>Payment Information</h3>
          <div className="payment-info">
            <p><strong>Method:</strong> {order.paymentInfo.method === 'creditCard' ? 'Credit Card' : 'Cash'}</p>
            <p><strong>Status:</strong> {order.paymentInfo.status}</p>
            {order.paymentInfo.method === 'creditCard' && (
              <>
                <p><strong>Card Ending:</strong> **** **** **** {order.paymentInfo.cardLast4}</p>
                {order.paymentInfo.cardExpiry && (
                  <p><strong>Expires:</strong> {order.paymentInfo.cardExpiry}</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrderStatus;