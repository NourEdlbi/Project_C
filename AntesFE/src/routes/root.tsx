import { Outlet } from "react-router-dom";
//import { useState } from 'react'
import '../headeroverlay.css'
export default function Root() {
    //const [pixelamount, setpixelamount] = useState(0);
    //<!-- <button onClick={() => setpixelamount((pixelamount) => pixelamount + 200)}> test{pixelamount} </button> -->
    return (
        <>
            <div className="header">
                <h1> Menu</h1>
                <a href={`/Home`}>Home</a>
                <a href={`/Agenda`}>Agenda</a>
                <a href={`/Forum`}>forum</a>
                <a href={`/Inst` }>instellingen</a>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}