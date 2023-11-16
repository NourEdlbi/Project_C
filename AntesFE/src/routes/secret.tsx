import React, { useState } from 'react';

const updateFormStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
};

const formContainerStyle = {
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
};

export default function UpdatePassword() {
  const [formData, setFormData] = useState({ email: '', newPassword: '', confirmPassword: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Get existing users from localStorage
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((user) => user.email === formData.email);

    if (userIndex !== -1) {
      // User exists, update password
      users[userIndex].password = formData.newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      alert('Password updated successfully!');
    } else {
      // User does not exist
      alert('No user found with that email');
    }
  };

  return (
    <div style={updateFormStyle}>
      <div style={formContainerStyle}>
        <h1>Update Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>New Password:</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="New Password"
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm New Password"
              required
            />
          </div>
          <button type="submit">Update Password</button>
        </form>
      </div>
    </div>
  );
}
