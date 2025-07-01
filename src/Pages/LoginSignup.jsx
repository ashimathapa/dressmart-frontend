import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import helloImage from '../Components/Assets/hello.jpeg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({ username: "", password: "", email: "" });
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResponse = (responseData) => {
    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      toast.success('Login successful! Redirecting...');
      setTimeout(() => {
        window.location.replace("/");
      }, 2000);
    } else {
      toast.error(responseData.errors || 'Operation failed');
    }
  };

  const login = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      handleResponse(responseData);
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const signup = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      handleResponse(responseData);
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-form">
          <h2>{state === 'Login' ? 'Login' : 'Sign Up'}</h2>
          <p>{state === 'Login' ? 'Login and have more fun' : 'Join us and have more fun!'}</p>

          <form onSubmit={(e) => e.preventDefault()}>
            {state === 'Sign Up' && (
              <input
                name="username"
                value={formData.username}
                onChange={changeHandler}
                type="text"
                placeholder="Your Name"
                required
              />
            )}
            <input
              name="email"
              value={formData.email}
              onChange={changeHandler}
              type="email"
              placeholder="Email Address"
              required
            />
            <input
              name="password"
              value={formData.password}
              onChange={changeHandler}
              type="password"
              placeholder="Password"
              required
            />
            <button
              className="login-button"
              onClick={() => (state === 'Login' ? login() : signup())}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Continue'}
            </button>
          </form>

          <p className="register-link">
            {state === 'Sign Up'
              ? 'Already have an account? '
              : "Don't have an account? "}
            <span onClick={() => setState(state === 'Login' ? 'Sign Up' : 'Login')}>
              {state === 'Sign Up' ? 'Login here' : 'Sign Up here'}
            </span>
          </p>
        </div>

        <div className="login-image">
          <img src={helloImage} alt="Welcome" />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default LoginSignup;