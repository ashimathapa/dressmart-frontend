import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import helloImage from '../Components/Assets/hello.jpeg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({ 
    username: "", 
    password: "", 
    email: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleResponse = (responseData) => {
    if (responseData.success) {
      // Store token and user data
      localStorage.setItem('auth-token', responseData.token);
      localStorage.setItem('userData', JSON.stringify({
        id: responseData.user.id,
        email: responseData.user.email,
        roles: responseData.user.roles
      }));
      
      toast.success(`${state === 'Login' ? 'Login' : 'Signup'} successful! Redirecting...`);
      
      // Always redirect to homepage first
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      toast.error(responseData.message || 'Operation failed');
    }
  };

  const login = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || 'Login failed');
      }
      handleResponse(responseData);
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const signup = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          username: formData.username
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || 'Registration failed');
      }
      
      // After successful registration, automatically log the user in
      const loginResponse = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });
      
      const loginData = await loginResponse.json();
      if (!loginResponse.ok) {
        throw new Error(loginData.message || 'Auto-login failed');
      }
      handleResponse(loginData);
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.message || 'An error occurred during signup');
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

          <form onSubmit={(e) => {
            e.preventDefault();
            state === 'Login' ? login() : signup();
          }}>
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
              minLength="6"
            />
            <button
              className="login-button"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span> Loading...
                </>
              ) : (
                'Continue'
              )}
            </button>
          </form>

          <p className="register-link">
            {state === 'Sign Up'
              ? 'Already have an account? '
              : "Don't have an account? "}
            <span 
              onClick={() => {
                setState(state === 'Login' ? 'Sign Up' : 'Login');
                setFormData({
                  username: "", 
                  password: "", 
                  email: ""
                });
              }}
              style={{cursor: 'pointer', color: '#4CAF50'}}
            >
              {state === 'Sign Up' ? 'Login here' : 'Sign Up here'}
            </span>
          </p>
        </div>

        <div className="login-image">
          <img src={helloImage} alt="Welcome" />
        </div>
      </div>

      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default LoginSignup;