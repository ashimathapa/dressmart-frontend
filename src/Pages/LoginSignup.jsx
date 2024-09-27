import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import helloImage from '../Components/Assets/hello.jpeg';

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Login Function Executed", formData);
    let responseData;

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        alert('Login successful!');
        window.location.replace("/");
      } else {
        alert(responseData.errors || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
    }
  };

  const signup = async () => {
    console.log("Signup Function Executed", formData);
    let responseData;

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace("/");
      } else {
        alert(responseData.errors || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup');
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
            >
              Continue
            </button>
          </form>

          {state === 'Sign Up' ? (
            <p className="register-link">
              Already have an account?{' '}
              <span onClick={() => setState('Login')}>Login here</span>
            </p>
          ) : (
            <p className="register-link">
              Don't have an account?{' '}
              <span onClick={() => setState('Sign Up')}>Sign Up here</span>
            </p>
          )}

          <div className="remember-me">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy</p>
          </div>
        </div>

        <div className="login-image">
          <img src={helloImage} alt="Welcome" />
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
