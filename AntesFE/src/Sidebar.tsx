import { Outlet, useNavigate } from 'react-router-dom';
import menuImage from './assets/Anteslogo.png';
import "./headeroverlay.css";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { userinfoInterface } from "./interfaces.tsx";
import { useState, useEffect } from 'react';

export default function Sidebar() {
    const navigate = useNavigate();

    const [content, setcontent] = useState<JSX.Element>(<div></div>);

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('Userinfo');
        const userInfo: userinfoInterface = storedUserInfo ? JSON.parse(storedUserInfo) : null;
        if (userInfo && userInfo.admin == true) {
            setcontent( admincontent)
            
        }
        else {
            setcontent( usercontent)
        }
    }, []);
    
    //Navigeren naar de juiste routes.
    const handleManageProfile = () => {
        navigate('profile');
    };
    const handleManageLogout = () => {
        navigate('/');
    };
    const handleManageUsers = () => {
        navigate('users');
    };
    const handleManageHome = () => {
        navigate('Home');
    };
    const handleManageAgenda = () => {
        navigate('Agenda');
    };
    const handleManageForum = () => {
        navigate('userForum');
    };
    const handleManageInfo = () => {
        navigate('Informatie');
    };
    const handleManageQuiz = () => {
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

    const usercontent = () => {
        return (
            <div>
            <div id="sbar" className="sidebar">
                <img className="image" src={menuImage} alt="Menu" style={{ width: '120px', height: 'auto' }} />
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
                    <a onClick={handleManageInfo}>GGZ Ecademy</a>
                </div>
                <div className="border"></div>
            </div>
            <button id="open" className="openbtn" onClick={openNav}>
                <KeyboardDoubleArrowRightIcon style={{ padding: '0', width: '23px' }}></KeyboardDoubleArrowRightIcon>
            </button>
            <div id="detail">
                <Outlet />
            </div>
            </div>

        )
    }

    const admincontent = () => {
        return (
            <>
            <div id="sbar" className="sidebar">
                <img className="image" src={menuImage} alt="Menu" style={{ width: '100px', height: 'auto' }} /> {/* Replace "alt" with a suitable description for the image. */}
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
                    <a onClick={handleManageUsers}>Manage Users</a>
                </div>

                <div className="sidebarbox">
                    <a onClick={handleManageQuiz}>Manage Quiz</a>
                </div>

                <div className="sidebarbox">
                    <a onClick={handleManageAgenda}>Manage Agenda</a>
                </div>

                <div className="sidebarbox">
                    <a onClick={handleManageForum}>Forum</a>
                </div>

                <div className="sidebarbox">
                    <a onClick={handleManageInfo}>GGZ Ecademy</a>
                </div>

                <div className="border"></div>
            </div>
            <button id="open" className="openbtn" onClick={openNav}> Open Sidebar</button>

            <div id="detail">
                <Outlet />
                </div>
            </>
        )
    }

    return (
        <>
            {content}
        </>
           
    );
}
