import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import './index.css'
import Root from './routes/root.tsx';
import ErrorPage from "./error-page";
import Home from './routes/homepage.tsx';
import Agenda from './routes/agenda.tsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "agenda",
                element: <Agenda />,
            },
            {
                path: "Home/1",
                element: <Home />
            }
        ],

    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
