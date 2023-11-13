
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import ErrorPage from "./error-page";
import Login from './routes/Loginpage.tsx';
import Agenda from './routes/agenda.tsx';
import Info from './routes/Info.tsx';
import Inst from './routes/instellingen.tsx';
import Sidebar from './routes/sidebar.tsx';
import ASidebar from './routes/adminSidebar.tsx';
import USidebar from './routes/userSidebar.tsx';
import Users from './routes/Admin/users.tsx';
import AForum from './routes/Admin/adminForum.tsx';
import Profiel from './routes/User/Profile.tsx';
import Uagenda from './routes/User/userAgenda.tsx';
import Uforum from './routes/User/userForum.tsx';

function Main() {
    const [isNightMode, setIsNightMode] = useState(() => {
        const savedMode = localStorage.getItem('isNightMode');
        return savedMode !== null ? JSON.parse(savedMode) : false;
    });

    useEffect(() => {
        document.body.classList.toggle('dark-mode', isNightMode);
        localStorage.setItem('isNightMode', JSON.stringify(isNightMode));

        const interval = setInterval(() => {
            const savedMode = localStorage.getItem('isNightMode');
            const currentMode = savedMode !== null ? JSON.parse(savedMode) : false;
            if (currentMode !== isNightMode) {
                setIsNightMode(currentMode);
            }
        }, 100); // Check every 100ms

        return () => clearInterval(interval);
    }, [isNightMode]);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Sidebar />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "adminSidebar", // The path for adminSidebar
                    element: <ASidebar />, // Render the ASidebar component directly
                    children: [
                        {
                            path: "users",
                            element: <Users />,
                        },
                        {
                            path: "adminForum",
                            element: <AForum />,
                        },

                    ],

                },
                {
                    path: "userSidebar", // The path for userSidebar
                    element: <USidebar />, // Render the USidebar component directly
                    children: [
                        {
                            path: "Profile",
                            element: <Profiel />,
                        },
                        {
                            path: "agenda",
                            element: <Uagenda />,
                        },
                        {
                            path: "userForum",
                            element: <Uforum />,
                        },

                    ],
                },
                {
                    path: "agenda",
                    element: <Agenda />,
                },
                {
                    path: "Login",
                    element: <Login />
                },
                {
                    path: "Informatie",
                    element: <Info />
                },
                {
                    path: "inst",
                    element: <Inst />
                },
            ],

        },
    ]);

    return (
        <RouterProvider router={router} />
    );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>,
);