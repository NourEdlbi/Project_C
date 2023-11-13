


import React, { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import menuImage from '../assets/Anteslogo.png';
import '../headeroverlay.css';

export default function Sidebar() {
    const [isNightMode, setIsNightMode] = useState(() => {
        const savedMode = localStorage.getItem('isNightMode');
        return savedMode !== null ? JSON.parse(savedMode) : false;
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const savedMode = localStorage.getItem('isNightMode');
            const currentMode = savedMode !== null ? JSON.parse(savedMode) : false;
            if (currentMode !== isNightMode) {
                setIsNightMode(currentMode);
            }
        }, 100); // Check every 100ms

        return () => clearInterval(interval);
    }, [isNightMode]);

    return (
        <>
            <div className={`header ${isNightMode ? 'night-mode-sidebar' : ''}`}>
                <img src={menuImage} alt="Menu" style={{ width: '100px', height: 'auto' }} />
                <div className="sidebarbox">
                    <a href={`/Login`}>Login</a>
                </div>
                <div className="sidebarbox">
                    <a href={`/Agenda`}>Agenda</a>
                </div>
                <div className="sidebarbox">
                    <a href={`/Informatie`}>Informatie</a>
                </div>
                <div className="sidebarbox">
                    <a href={`/Inst`}>instellingen</a>
                </div>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}
