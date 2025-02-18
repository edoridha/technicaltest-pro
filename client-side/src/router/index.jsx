import { createBrowserRouter, redirect } from "react-router-dom";

import React from 'react'
import Login from "../views/Login";
import Register from "../views/Register";
import Profile from "../views/Profile";
import LoginAdmin from "../views/LoginAdmin";
import Dashboard from "../views/Dashboard";
import EditForm from "../views/EditForm";
import Layout from "../components/Layout";

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
            element: <Profile />
        },
        {
            path: "/adminpanel",
            element: <LoginAdmin />
        },
        {
            element: <Layout />,
            loader: () => {
                const token = localStorage.getItem('access_token')
                if (!token) throw redirect('/adminpanel')
                return null
            },
            children: [
                {
                    path: "/adminpanel/dashboard",
                    element: <Dashboard />
                },
                {
                    path: "/adminpanel/edit/:id",
                    element: <EditForm />
                }
            ]
        },
    ]
)
