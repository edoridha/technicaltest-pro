import { createBrowserRouter, redirect } from "react-router-dom";

import React from 'react'
import Login from "../views/Login";
import Register from "../views/Register";
import Profile from "../views/Profile";
import LoginAdmin from "../views/LoginAdmin";

export default createBrowserRouter(
    [
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/register",
            element: <Register />
        },
        {
            path: '/profile',
            element: <Profile/>
        },
        {
            path: "/adminpanel",
            element: <LoginAdmin />
        }
    ]
)
