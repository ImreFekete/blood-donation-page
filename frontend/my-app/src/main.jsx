import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from './App.jsx'
import CalendarComp from "./Components/CalendarComp.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";
import UpdatePage from "./Pages/UpdatePage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        // element: <Layout />,
        // errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <App/>,
            },
            {
                path: "/calendar/:id",
                element: <CalendarComp/>,
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
                element: <App />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
