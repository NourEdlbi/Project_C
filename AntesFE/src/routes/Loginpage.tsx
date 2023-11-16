import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import menuImage from '../assets/Anteslogo.png';
import '../routes/LoginPage.css';

const loginFormStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
};

const logoStyle = {
  width: '300px',
  height: 'auto',
  position: 'relative',
  bottom: '5rem',
};

const formContainerStyle = {
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
};

const errorStyle = {
  color: 'red',
  marginBottom: '10px',
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check for the hardcoded admin user
    if (email === 'admin@antes.nl' && password === 'Welkom1') {
      navigate('/adminSidebar');
      return; // Exit the function early
    }
  
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((user) => user.email === email && user.password === password);
  
    if (user) {
      navigate('/userSidebar');
    } else {
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
