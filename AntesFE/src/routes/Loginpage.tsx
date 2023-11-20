import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import fs from "fs";

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

    const update = {
        email: "tes@te.nl",
        wachtwoord: "dhd",
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(update),
    };

    const submitlogin = () => {
        fetch("https://localhost:7109/Login", options).then((res) => fs.writeFileSync("file.txt",JSON.stringify(res), {
            flag: "w"
        }));
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
