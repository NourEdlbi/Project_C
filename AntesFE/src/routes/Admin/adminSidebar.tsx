import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import menuImage from '../../../assets/Anteslogo.png';
import '../../headeroverlay.css'

export default function AdminSidebar() {
    const navigate = useNavigate();


    const handleManageUsers = () => {
        // Navigate to the "Manage Users" route
        navigate('users');
    };

    return (
        <>
            <div className="sidebar">
            <img src={menuImage} alt="Menu" style={{ width: '100px', height: 'auto' }} /> {/* Replace "alt" with a suitable description for the image. */}
                
                <div className="sidebarbox">
                    <a href={`/adminSidebar/Home`} >Home</a>
                </div>

                <div className="sidebarbox">
                    <a onClick={handleManageUsers}>Manage Users</a>
                </div>
                
                <div className="sidebarbox">
                    <a href={`/adminSidebar/adminQuiz`}>Manage Quiz</a>
                </div>
                <div className="sidebarbox">
                    <a href={`/adminSidebar/adminAgenda`}>Manage Agenda</a>
                </div>
                <div className="sidebarbox">
                    <a href={`/adminSidebar/adminForum`}>Forum</a>
                </div>
                <div className="sidebarbox">
                    <a href={`/adminSidebar/Informatie`}>Informatie</a>
                </div>
                <div className="sidebarbox">
                    <a href={`/adminSidebar/inst`}>Instellingen</a>
                </div>
                <div className="sidebarbox"></div>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}