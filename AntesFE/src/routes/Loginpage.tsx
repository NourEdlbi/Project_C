/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../routes/LoginPage.css';
import menuImage from '../assets/Anteslogo.png'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (email === 'user@antes.nl' && password === 'Welkom0') {
      navigate('/userSidebar');
    } else if (email === 'admin@antes.nl' && password === 'Welkom1') {
      navigate('/adminSidebar');
    } else {
      // Set an error message
      setErrorMessage('Incorrect email or password');
    }
  };

  const handleForgotPassword = () => {
    navigate('/password-reset');
  };
  

  return (
    <div style={loginFormStyle}>
      <img src={menuImage} alt="Logo" style={logoStyle} />
      <div style={formContainerStyle}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              required
            />
          </div>
          {errorMessage && <div style={errorStyle}>{errorMessage}</div>}
          <button type="submit">Log In</button>
          <button type="button" onClick={handleForgotPassword} style={{ marginTop: '10px' }}>
            Wachtwoord Vergeten
          </button>
        </form>
      </div>
    </div>
  );
}
