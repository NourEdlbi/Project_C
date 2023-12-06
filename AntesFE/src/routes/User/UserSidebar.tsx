/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import menuImage from '../../assets/Anteslogo.png';
import "../../headeroverlay.css";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';


export default function UserSidebar() {
    const navigate = useNavigate();

    const handleManageProfile = () => {
    // Navigate to the "Profile" route
    navigate('profile');
    };

    const handleManageLogout = () => {
        // Navigate to the "Profile" route
        navigate('/');
    };

    const handleManageHome = () => {
        // Navigate to the "Profile" route
        navigate('Home');
    };

    const handleManageAgenda = () => {
        // Navigate to the "Agenda" route
        navigate('Agenda');
    };

    const handleManageForum = () => {
        // Navigate to the "Profile" route
        navigate('userForum');
    };

    const handleManageSettings = () => {
        // Navigate to the "Profile" route
        navigate('inst');
    };

    const handleManageInfo = () => {
        // Navigate to the "Profile" route
        navigate('Informatie');
    };
    const handleManageQuiz = () => {
        // Navigate to the "Profile" route
        navigate('Quizzes');
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
        <div>
            <div id="sbar" className="sidebar">
                <img className="image" src={menuImage} alt="Menu" style={{ width: '120px', height: 'auto'}} />
                <button className="closebtn" onClick={closeNav}> X </button>
                <div className="border"></div>
                <div className="sidebarbox">
                    <a onClick={handleManageLogout}>Uitloggen</a>
                </div>
                <div className="sidebarbox">
                    <a onClick={handleManageHome}>Home</a>                  
                </div>
                <div className="sidebarbox"> 
                    <a onClick={handleManageProfile}>Profiel</a>
                </div>
                <div className="sidebarbox">
                    <a onClick={handleManageAgenda}>Agenda</a>
                </div>
                <div className="sidebarbox">
                    <a onClick={handleManageQuiz}>Quiz</a>
                </div>

                <div className="sidebarbox">
                    <a onClick={handleManageForum}>Forum</a>
                </div>

                <div className="sidebarbox">
                    <a onClick={handleManageInfo}>Informatie</a>
                  
                   {/* <div className="dropdown-content">
                        <div className="sidebarbox">
                            <a >Protocollen en Richtlijnen</a> <br />
                        </div>
                        <div className="sidebarbox">
                            <a >cursussen</a> <br />
                        </div>
                        <div className="sidebarbox">
                            <a> test</a>
                        </div>
                    </div>*/}
                </div>

                <div className="sidebarbox">
                    <a onClick={handleManageSettings}>Instellingen</a>
                </div>
                <div className="border"></div>
            </div>
            <button id= "open" className="openbtn" onClick={openNav}> 
            <KeyboardDoubleArrowRightIcon style={{padding: '0', width: '23px'}}></KeyboardDoubleArrowRightIcon> 
            </button> 
            <div id="detail">
                <Outlet />
            </div>
        </div>
    );
}
