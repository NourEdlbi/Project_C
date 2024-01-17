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
import Welkom from "./routes/User/WelcomeScreen.tsx"
import Playquiz from "./routes/PlayQuiz.tsx";
import HomePage from "./routes/Homepage.tsx";
import Sidebar from "./Sidebar.tsx";

import Users from './routes/Admin/AdminUsers.tsx';
// import Aforum from './routes/Admin/adminForum.tsx';
import AdminAgenda from './routes/Admin/AdminAgenda.tsx';

import Uagenda from './routes/User/userAgenda.tsx';
import Uforum from './routes/User/UserForm.tsx';
import PostDetail from './routes/User/PostDetail.tsx';
// import UPost from './routes/User/Post.tsx';
// import AddPost from './routes/Admin/AdminAddQuiz.tsx';
import Quiz from './routes/User/UserQuizzes.tsx';
import Addquiz from './routes/Admin/AdminAddQuiz.tsx';
import AddUser from './routes/adduser.tsx';
import AddAgendaItem from "./routes/Admin/AddAgendaItem.tsx";

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
                    path: "Sidebar", // The path for Sidebar
                    element: <Sidebar />, // Render the Sidebar component directly
                    children: [{
                        path: "Quizzes/:id",
                        element: <Playquiz />,
                    },
                    {
                        path: "Quizzes/MakeQuiz",
                        element: <Addquiz />,
                    },
                    {
                        path: "Profile",
                        element: <Profiel />,
                    },
                    {
                        path: "Home",
                        element: <HomePage />
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
                        path: "Quizzes",
                        element: <Quiz />,
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
                    {
                        path: "welcome", // Define the route for Welcome screen
                        element: <Welkom />, // Specify the component to render
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