/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../routes/LoginPage.css';
import menuImage from '../assets/Anteslogo.png'
import { BASE_URL } from '../consts.ts';
import axios from "axios";


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const navigate = useNavigate();
   interface userinfoInterface {
        id: number;
        name: string;
        email: string;
        admin: boolean;
    }

    const [userInfos, setUserInfos] = useState<userinfoInterface>();
    const [test, settest] = useState('');
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin2 = (e) => {
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

    const handleLogin = () => {
        axios.post("https://localhost:7109/Login", { email, password })
            .then((response) => {
                /*setAuthTokens(response.data);
                localStorage.setItem("authTokens", JSON.stringify(response.data)); setUser(jwtDecode(response.data.access));*/
                // setLoading(true);
                setUserInfos(response.data)
                if (userInfos?.admin == true) {
                    navigate("/adminSidebar");
                }
                navigate("/userSidebar")
            })
            .catch((error) => {
                console.log(error.message);

            }
            )
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
        body: JSON.stringify(update),
    };

        async function submitlogin() {
        try {
            const response = await fetch(`${BASE_URL}/Login`, options);
            const data = await response.json();

            localStorage.setItem('Userinfo', JSON.stringify(data));
            setUserInfos(prevState => {
                // Use the prevState to access the latest state
                if (prevState?.admin) {
                    navigate('/adminSidebar');
                } else {
                    navigate('/userSidebar');
                }
                return { ...data, admin: prevState?.admin };
            });
        } catch (error) {
            console.log(error);
            setErrorMessage('Incorrect email or password');
        }
    }


    return (
    <div className="login">
        <img src={menuImage} alt="Logo" style={{ width: '300px', height: 'auto', position: 'relative', bottom: '5rem' }} />
            <h1>Login</h1>
        <form onSubmit={submitlogin}>
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
            <button type="submit" onClick={submitlogin} style={{marginRight: '15px'}}>Log In</button>
            <button type="button" onClick={handleResetPassword}>Reset Password</button> <br></br><br></br>
            <button type="button" onClick={submitlogin} >Rtest</button>
        </form>
    </div>
    );
}
