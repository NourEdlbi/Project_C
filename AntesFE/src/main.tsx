import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import './index.css'
import Root from './routes/root.tsx';
import ErrorPage from "./error-page";
import Home from './routes/homepage.tsx';
import Agenda from './routes/agenda.tsx'
import Forum from './routes/forum.tsx';
import Inst from './routes/instellingen.tsx';

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
                path: "Home",
                element: <Home />
            },
            {
                path: "Forum",
                element: <Forum />
            },
            {
                path: "inst",
                element: <Inst />
            }
        ],

    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
