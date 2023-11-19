import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

  const handleResetPassword = () => {
    // Navigate to the PasswordReset page
    navigate('/password-reset'); // Update this path to match your route for PasswordReset
  };
    const submitlogin = () => {
        fetch("https://localhost:7109/WeatherForecast", {
            method: "GET"
        }).then((res) => console.log(res));
    }

  return (
    <div className="pagecontent">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
          />
        </div>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
              <button onClick={submitlogin} type="submit">Log In</button>

              
        <button type="button" onClick={handleResetPassword}>Reset Password</button>
          </form>
          <button onClick={submitlogin} >g In</button>
    </div> 
  );
}
