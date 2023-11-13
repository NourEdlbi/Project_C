import { Outlet } from "react-router-dom";
import menuImage from '../assets/Anteslogo.png'
//import { useState } from 'react'
import '../headeroverlay.css';
export default function Sidebar() {
    //const [pixelamount, setpixelamount] = useState(0);
    //<!-- <button onClick={() => setpixelamount((pixelamount) => pixelamount + 200)}> test{pixelamount} </button> -->
    //<img src="../assets/Anteslogo.png" > </img>
    return (
        <>
            <div className="header">
                
            <img src={menuImage} alt="Menu" style={{ width: '100px', height: 'auto' }} /> {/* Replace "alt" with a suitable description for the image. */}
                <div className="sidebarbox">
                    <a href={`/Logout`}>Logout</a>
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