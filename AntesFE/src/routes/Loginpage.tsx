import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../routes/LoginPage.css';
import menuImage from '../assets/Anteslogo.png'
import { BASE_URL } from '../consts.ts';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const navigate = useNavigate();
    const [userInfos, setUserInfos] = useState<userinfoInterface>();
    interface userinfoInterface {
        id: number;
        name: string;
        email: string;
        admin: boolean;
    }

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

    async function handleLogin() {
        try {
            const response = await fetch(`${BASE_URL}/Login`, options);
            const data = await response.json();
            localStorage.setItem('Userinfo', JSON.stringify(data))
            setUserInfos(data)
            if (userInfos?.admin == true) {
                navigate("/adminSidebar");
            }
            else if (userInfos?.admin == false) {
                navigate("/userSidebar/Home")
            }
           
        } catch (error) {
            console.log(error);
            setErrorMessage('Incorrect email or password');
        }

        /* setUserInfos(prevState => {
                // Use the prevState to access the latest state
                if (prevState?.admin) {
                    navigate('/adminSidebar');
                } else {
                    navigate('/userSidebar');
                }
                return { ...data, admin: prevState?.admin };
            });*/
    }


    return (
    <div className="login">
        <img src={menuImage} alt="Logo" style={{ width: '300px', height: 'auto', position: 'relative', bottom: '5rem' }} />
            <h1>Login</h1>
        <form /* onSubmit={submitlogin} */>
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
            <button type="submit" /* onClick={submitlogin} */ style={{marginRight: '15px'}}>Log In</button>
            <button type="button" onClick={handleResetPassword}>Reset Password</button> <br></br><br></br>
            <button type="button" onClick={handleLogin} >Rtest</button>
        </form>
    </div>
    );
}
