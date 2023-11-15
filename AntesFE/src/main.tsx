<<<<<<< HEAD
/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import './index.css'
=======

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
>>>>>>> main
import ErrorPage from "./error-page";
import Login from './routes/Loginpage.tsx';
import Info from './routes/Info.tsx';
import Inst from './routes/Instellingen.tsx';
import PasswordReset from './routes/PasswordReset.tsx';
import Profiel from './routes/Profile.tsx';

import ASidebar from './routes/Admin/adminSidebar.tsx';
import Users from './routes/Admin/AdminUsers.tsx';
import AForum from './routes/Admin/AdminForum.tsx';
import Aquiz from './routes/Admin/AdminQuiz.tsx';
import AdminAgenda from './routes/Admin/AdminAgenda.tsx';

import USidebar from './routes/User/UserSidebar.tsx';
import Uagenda from './routes/User/UserAgenda.tsx';
import Uforum from './routes/User/UserForum.tsx';
import Uhome from './routes/User/UserHomepage.tsx';
import Uquiz from './routes/User/UserQuiz.tsx';

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


<<<<<<< HEAD
const router = createBrowserRouter([
    {
        path: "/",
        //element: <Sidebar />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Login/>,
            },
            {
                path: "adminSidebar", // The path for adminSidebar
                element: <ASidebar />, // Render the ASidebar component directly
                children: [
                    {
                        path: "users",
                        element: <Users/>,
                    },
                    {
                        path: "adminForum",
                        element: <AForum/>,
                    },
                    
                ],
                
            },
            {
                path: "userSidebar", // The path for userSidebar
                element: <USidebar />, // Render the USidebar component directly
                children: [
                    {
                        path: "Profile",
                        element: <Profiel/>,
                    },
                    {
                        path: "agenda",
                        element: <Uagenda/>,
                    },
                    {
                        path: "userForum",
                        element: <Uforum/>,
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
=======
        return () => clearInterval(interval);
    }, [isNightMode]);
    
    const router = createBrowserRouter([
        {
            path: "/",
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "/",
                    element: <Login />,
                },
                {
                    path: "password-reset", // Define the route for password reset
                    element: <PasswordReset />, // Specify the component to render
                },
                {
                    path: "adminSidebar", // The path for adminSidebar
                    element: <ASidebar />, // Render the ASidebar component directly
                    children: [
                        {
                            path: "users",
                            element: <Users/>,
                        },
                        {
                            path: "adminForum",
                            element: <AForum/>,
                        }, 
                        {
                            path: "adminQuiz",
                            element: <Aquiz />,
                        },
                        {
                            path: "adminAgenda",
                            element: <AdminAgenda />,
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
                {
                    path: "userSidebar", // The path for userSidebar
                    element: <USidebar />, // Render the USidebar component directly
                    children: [
                        {
                            path: "Profile",
                            element: <Profiel/>,
                        },
                        {
                            path: "agenda",
                            element: <Uagenda/>,
                        },
                        {
                            path: "userForum",
                            element: <Uforum/>,
                        },
                        {
                            path: "Informatie",
                            element: <Info />
                        },
                        {
                            path: "inst",
                            element: <Inst />
                        },
                        {
                            path: "Home",
                            element: <Uhome />
                        },
                        {
                            path: "Quizzes",
                            element: <Uquiz />
                        },
                    ],
                },
            ],
        },
    ]);
>>>>>>> main


    return (
        <RouterProvider router={router} />
    );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>,
);