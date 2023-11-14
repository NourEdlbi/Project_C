import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import menuImage from '../../assets/Anteslogo.png';
import '../../headeroverlay.css'

export default function AdminSidebar() {
    const navigate = useNavigate();


    const handleManageUsers = () => {
        // Navigate to the "Manage Users" route
        navigate('users');
    };

    function closeNav() {
        const x = document.getElementById("sbar") as HTMLElement;
        x.style.width = "0px";
        const y = document.getElementById("detail") as HTMLElement;
        y.style.marginLeft = "0px";
        const z = document.getElementById("open") as HTMLElement;
        z.style.left = "2rem";
        const a = document.getElementById("open") as HTMLElement;
        a.style.display = "block";
    }

    function openNav() {
        const x = document.getElementById("sbar") as HTMLElement;
        x.style.width = "12rem";
        const y = document.getElementById("detail") as HTMLElement;
        y.style.marginLeft = "12rem";
        const z = document.getElementById("open") as HTMLElement;
        z.style.left = "13rem";
        const a = document.getElementById("open") as HTMLElement;
        a.style.display = "none";

    }

    return (
        <>
            <div id="sbar" className="sidebar">
                <img src={menuImage} alt="Menu" style={{ width: '100px', height: 'auto' }} /> {/* Replace "alt" with a suitable description for the image. */}
                <button className="closebtn" onClick={closeNav}> X </button>

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
            </div>
            <button id="open" className="openbtn" onClick={openNav}> Open Sidebar</button>

            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}