/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../routes/LoginPage.css';
import menuImage from '../assets/Anteslogo.png'
import jwt_decode from "jwt-decode";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from '../consts';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const navigate = useNavigate();
    const { setAuthTokens, setLoading, setUser } = useContext(AuthContext);

    /*const handleLogin = (e: React.FormEvent) => {
        .then((response) => {
            console.log(response.data)
            setAuthTokens(response.data);
            localStorage.setItem("authTokens", JSON.stringify(response.data)); setUser(jwt_decode(response.data.access));
            setLoading(true);
            navigate("/");
        })
       
        )
    };*/

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
        }

        else if (email === 'admin@antes.nl' && password === 'Welkom1') {
            navigate('/adminSidebar');
        }

        else { // Set an error message
            setErrorMessage('Incorrect email or password');
        }
    };

    const handleResetPassword = () => {
        // Navigate to the PasswordReset page
        navigate('/password-reset'); // Update this path to match your route for PasswordReset
    };

    const update = {
        email: email,
        wachtwoord: password,
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stripingify(update),
    };

    const submitlogin = () => {
        fetch(`${BASE_URL}/Login`, options).then(res => console.log(res)).catch(error => console.log(error));
    };

    return (
        <div className="login">
            <img src={menuImage} alt="Logo" style={{ width: '300px', height: 'auto', position: 'relative', bottom: '5rem' }} />
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Email"
                    />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Password"
                    />
                </div>
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                <button type="submit" style={{ marginRight: '15px' }}>Log In</button>
                <button type="button" onClick={handleResetPassword}>Reset Password</button> <br></br><br></br>
                <button type="button" onClick={submitlogin}>Rtest</button>
            </form>
        </div>
    );
}
