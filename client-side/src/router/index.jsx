import { createBrowserRouter, redirect } from "react-router-dom";

import React from 'react'
import Login from "../views/Login";
import Register from "../views/Register";

export default createBrowserRouter(
    [
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/register",
            element: <Register />
        }
    ]
)
