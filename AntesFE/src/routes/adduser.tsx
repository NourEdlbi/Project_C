import React, { useState } from 'react';
import menuImage from '../assets/Anteslogo.png';
import '../routes/LoginPage.css';
import {  useNavigate } from 'react-router-dom';

const formStyle = {
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

export default function AddUser() {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({ email: formData.email, password: formData.password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('User registered successfully!');
    console.log('Form submitted', formData);
    };
    const navigate = useNavigate();
    const tologin = () => {
        navigate('/');
    }

  return (
    <div style={formStyle}>
      <img src={menuImage} alt="Logo" style={logoStyle} />
      <div style={formContainerStyle}>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />
          </div>
                  <button onClick={ tologin} type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
