/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../consts';

export default function Inst() {
    const [isNightMode, setIsNightMode] = useState(() => {
        const savedMode = localStorage.getItem('isNightMode');
        return savedMode !== null ? JSON.parse(savedMode) : false;
    });

    const [textSize, setTextSize] = useState(() => {
        const savedSize = localStorage.getItem('textSize');
        return savedSize !== null ? parseInt(savedSize, 10) : 16; // Default text size is 16 if not stored
    });

    useEffect(() => {
        localStorage.setItem('isNightMode', JSON.stringify(isNightMode));
        localStorage.setItem('textSize', textSize.toString()); // Save text size to local storage
        document.body.style.fontSize = `${textSize}px`; // Apply the text size to the body element
    }, [isNightMode, textSize]);

    const toggleNightMode = () => {
        setIsNightMode(!isNightMode);
    };

    const increaseTextSize = () => {
        setTextSize(prevSize => prevSize + 2); // Increase text size by 2px
    };

    const decreaseTextSize = () => {
        setTextSize(prevSize => Math.max(prevSize - 2, 10)); // Decrease text size by 2px, with a minimum of 10px
    };

    const [formData, setFormData] = useState({password: '', confirmPassword: '' });

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
        fetch(`${BASE_URL}/Password_Reset`, options).then(res => console.log(res)).catch(error => console.log(error));       
        console.log('Form submitted', formData);
        alert('Wachtwoord veranderd!');
    };

    const update = {
        //email: email, //we zijn ingelogd dus email komt van ergens anders
        email:"tes@te.nl",
        wachtwoord: formData.password,
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(update),
    };

    function seepw(id) {
        const x = document.getElementById(id) as HTMLElement;
        if (x.style.display == "block") {
            x.style.display = "none";
        }
        else {
            x.style.display = "block";
        }
    }

    return (
        <div id="ia" className={`instellingen-area ${isNightMode ? 'night-mode' : ''}`}>
            <h1 className="title">Instellingen</h1>
            <div className="instellingen-content">
                <p className="choice">Maak uw keuze:</p>
                <button onClick={decreaseTextSize}>Maak tekst kleiner</button>
                <button onClick={increaseTextSize}>Maak tekst groter</button>
            </div>
            <div>
                <button onClick={toggleNightMode}>Nachtmodus switch</button>
            </div>
            <div>
                <button onClick={() => seepw("wachtwoord")}> Wachtwoord veranderen</button>
                <form id="wachtwoord" className="settingButton" onSubmit={handleSubmit}>
                    <input
                        type="password"

                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required >
                    </input>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required>
                    </input>  <br></br>
                    <button type="submit">Verander wachtwoord.</button>
                </form>
            </div>
        </div>
    );
}

