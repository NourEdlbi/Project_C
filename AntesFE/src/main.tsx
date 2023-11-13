/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import './index.css'
import ErrorPage from "./error-page";
import Login from './routes/Loginpage.tsx';
import Agenda from './routes/agenda.tsx'
import Info from './routes/Info.tsx';
import Inst from './routes/instellingen.tsx';
import Sidebar from './routes/sidebar.tsx';
import ASidebar from './routes/adminSidebar.tsx';
import USidebar from './routes/userSidebar.tsx';
import Users from './routes/Admin/users.tsx';
import AForum from  './routes/Admin/adminForum.tsx';
import Profiel from './routes/User/Profile.tsx';
import Uagenda from './routes/User/userAgenda.tsx';
import Uforum from './routes/User/userForum.tsx';


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

    },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
