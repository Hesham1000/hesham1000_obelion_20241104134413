import React, { useState } from 'react';
import './SignUpPage.css';
import axios from 'axios';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://sinai_blogApp-backend.cloud-stacks.com/api/users/signup', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setMessage(response.data.message);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setMessage('Email already in use.');
      } else {
        setMessage('Error signing up. Please try again.');
      }
    }
  };

  return (
    <div className="signup-page">
      <header className="header">
        <div className="logo">Brand Logo</div>
        <nav className="navigation">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>
      <main className="form-container">
        <h1>User can create an account</h1>
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I agree to the <a href="/terms">terms and conditions</a>
            </label>
          </div>
          <button type="submit" className="primary-button">Create Account</button>
        </form>
        <div className="additional-links">
          <a href="/forgot-password">Forgot password?</a>
          <a href="/login">Sign in</a>
        </div>
        {message && <p className="message">{message}</p>}
      </main>
      <footer className="footer">
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
        <a href="/contact">Contact Information</a>
      </footer>
    </div>
  );
};

export default SignUpPage;
