import { Outlet } from "react-router-dom";
//import { useState } from 'react'
import '../headeroverlay.css';
export default function Sidebar() {
    //const [pixelamount, setpixelamount] = useState(0);
    //<!-- <button onClick={() => setpixelamount((pixelamount) => pixelamount + 200)}> test{pixelamount} </button> -->
    //<img src="../assets/Anteslogo.png" > </img>
    return (
        <>
            <div className="sidebar">
                
                <h1> Menu</h1>
                <div className="sidebarbox">
                    <a href={`/Home`}>Home</a>
                </div>
                <div className="sidebarbox">
                    <a href={`/Agenda`}>Agenda</a>
                </div>
                <div className="sidebarbox">
                    <a href={`/Forum`}>forum</a>
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