import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../routes/LoginPage.css';
import menuImage from '../assets/Anteslogo.png';
import { BASE_URL } from '../consts.ts';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [userInfos, setUserInfos] = useState<userinfoInterface | null>(null);

    interface userinfoInterface {
        id: number;
        name: string;
        email: string;
        admin: boolean;
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleResetPassword = () => {
        navigate('/password-reset');
    };

    const handleLogin = async () => {
        try {
            const response = await fetch(`${BASE_URL}/Login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    wachtwoord: password,
                }),
            });

            const data = await response.json();
            localStorage.setItem('Userinfo', JSON.stringify(data));
            setUserInfos(data);

            // Use the callback form of setState to ensure you get the latest state
            setUserInfos((prevState) => {
                localStorage.setItem('Userinfo', JSON.stringify(data));

                if (data.admin) {
                    navigate('/adminSidebar');
                } else {
                    navigate('/userSidebar/welcome');
                }

                return data;
            });
        } catch (error) {
            console.error(error);
            setErrorMessage('Incorrect email or password');
        }
    };

    return (
        <div className="login">
            <img
                src={menuImage}
                alt="Logo"
                style={{ width: '300px', height: 'auto', position: 'relative', bottom: '5rem' }}
            />
            <h1>Login</h1>
            <form>
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
                        placeholder="Wachtwoord"
                    />
                </div>
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                <button type="button" style={{ marginRight: '15px' }} onClick={handleLogin}>
                    Inloggen
                </button>
                <button type="button" onClick={handleResetPassword}>
                    Wachtwoord Vergeten
                </button>
                <br />
                <br />
                {/* Add additional buttons or UI elements as needed */}
            </form>
        </div>
    );
}
