import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from './App.jsx'
import CalendarPage from "./Pages/CalendarPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";
import UpdatePage from "./Pages/UpdatePage.jsx";
import AdminPage from "./Pages/AdminPage.jsx";
import {UserProvider} from "./Pages/UserContext.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                path: "/",
                element: <App/>,
            },
            {
                path: "/calendar/:id",
                element: <CalendarPage/>,
            },
            {
                path: "/login",
                element: <LoginPage/>,
            },
            {
                path: "/register",
                element: <RegisterPage/>,
            },
            {
                path: "/update/:id",
                element: <UpdatePage/>,
            },
            {
                path: "/user/:id",
                element: <App/>,
            },
            {
                path: "/admin",
                element: <AdminPage/>,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <UserProvider>
            <RouterProvider router={router}/>
        </UserProvider>
    </React.StrictMode>
);
