/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import AuthProvider from "./context/AuthContext";
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.css';
import ErrorPage from "./error-page";
import Login from './routes/Loginpage.tsx';
import Info from './routes/Info.tsx';
import PasswordReset from './routes/PasswordReset.tsx';
import Profiel from './routes/Profile.tsx';

import ASidebar from './routes/Admin/adminSidebar.tsx';
import Users from './routes/Admin/AdminUsers.tsx';
// import Aforum from './routes/Admin/adminForum.tsx';
import Aquiz from './routes/Admin/AdminQuiz.tsx';
import AdminAgenda from './routes/Admin/AdminAgenda.tsx';

import USidebar from './routes/User/UserSidebar.tsx';
import Uagenda from './routes/User/userAgenda.tsx';
import Uforum from './routes/User/UserForm.tsx';
import PostDetail from './routes/User/PostDetail.tsx';
// import UPost from './routes/User/Post.tsx';
// import AddPost from './routes/Admin/AdminAddQuiz.tsx';
import Uhome from './routes/User/UserHomepage.tsx';
import Uquiz from './routes/User/UserQuiz.tsx';
import Uquizzes from './routes/User/UserQuizzes.tsx';
import Addquiz from './routes/Admin/AdminAddQuiz.tsx';
import AddUser from './routes/adduser.tsx';
import AddAgendaItem from "./routes/Admin/AddAgendaItem.tsx";

import Welkom from "./routes/User/WelcomeScreen.tsx"
import Playquiz from "./routes/PlayQuiz.tsx";

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
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "/",
                    element: <Login />,
                },
                {
                    path: "register", // <-- Add this route for registration
                    element: <AddUser />, // <-- Associate it with the AddUser component
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
                            path: "Profile",
                            element: <Profiel />,
                        },
                        {
                            path: "Home",
                            element: <Uhome />
                        },
                        {
                            path: "users",
                            element: <Users />,
                        },
                        {
                            path: "userForum",
                            element: <Uforum />,
                        },
                        {
                            path: "userForum/:id",
                            element: <PostDetail />,
                        },
                        {
                            path: "Quizzes/:id",
                            element: <Playquiz />,
                        },
                        {
                            path: "adminQuiz",
                            element: <Aquiz />,
                        },
                        {
                            path: "Quizzes/MakeQuiz",
                            element: <Addquiz />,
                        },
                        {
                            path: "adminAgenda",
                            element: <AdminAgenda />,
                        },
                        {
                            path: "adminAgenda/AddAgendaItem",
                            element: <AddAgendaItem />,
                        },
                        {
                            path: "Informatie",
                            element: <Info />
                        },                   
                    ],
                },
                {
                    path: "userSidebar", // The path for userSidebar
                    element: <USidebar />, // Render the USidebar component directly
                    children: [
                        {
                            path: "welcome", // Define the route for Welcome screen
                            element: <Welkom />, // Specify the component to render
                        },
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
                        {
                            path: "userForum/:id",
                            element: <PostDetail />,
                        },
                        {
                            path: "Informatie",
                            element: <Info />
                        },
                        {
                            path: "Home",
                            element: <Uhome />
                        },
                        {
                            path: "Quizzes",
                            element: <Uquizzes />,
                        },
                        {
                            path: "Quizzes/:quizID",
                            element: <Uquiz />,

                        },
                    ],
                },
            ],
        },
    ]);


    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>,
);