import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../routes/LoginPage.css';
import menuImage from '../assets/Anteslogo.png'
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext"; 


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const navigate = useNavigate();
    const { authTokens, setAuthTokens, setLoading, setUser } = useContext(AuthContext);

    interface userinfoInterface {
        ID: number;
        Name: string;
        Email: string;
        Admin: boolean;
    }

    const [userInfos, setUserInfos] = useState<userinfoInterface>();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleResetPassword = () => {
    // Navigate to the PasswordReset page
    navigate('/password-reset'); // Update this path to match your route for PasswordReset
    };

    const handleLogin = (e: React.FormEvent) => {
        axios
            .post("https://localhost:7109/Login", { email, password })
            .then((response) => {
                setAuthTokens(response.data);
                setUser(jwtDecode(response.data.access));
                localStorage.setItem("authTokens", JSON.stringify(response.data));
                setUserInfos(response.data);
                if (userInfos?.Admin == true) {
                    navigate("/adminSidebar");
                }
                navigate("/userSidebar")
                
                //setLoading(true);
            })
            .catch((error) => {
                console.log(error.message);
                /*if (error.message) {
                    setError(true);
                }*/
            })

        /*const response = fetch("https://localhost:7109/Login", options)
            .then(res => {
                console.log(res),
                    res.json()
            })
            .then((data) => {
                setAuthTokens(data)
            } )*/
       
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
                <label>Wachtwoord: </label>
                <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                />
            </div>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <button type="submit" style={{marginRight: '15px'}}>Log in</button>
            <button type="button" onClick={handleResetPassword}>Wachtwoord vergeten</button> 
        </form>
    </div>
    );
}
