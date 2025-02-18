import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Sidebar() {
    const navigate = useNavigate()
    const sidebarStyle = {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 100,
        padding: '48px 0 0',
        boxShadow: 'inset -1px 0 0 rgba(0, 0, 0, 0.1)',
    };

    const navLinkStyle = {
        fontWeight: 500,
        color: '#333',
    };

    const activeNavLinkStyle = {
        color: '#111',
    };

    const handleLogout = () => {
        localStorage.clear()
        navigate('/adminpanel')
    }


    return (
        <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse" id="sidebar-menu" style={sidebarStyle}>
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink to={'/adminpanel/dashboard/?page=0&limit=10'} className="nav-link active fw-bold" style={navLinkStyle} id="nav-dashboard">
                            Dashboard
                        </NavLink>
                    </li>
                </ul>
                <ul className="nav flex-column mb-2">
                    <li className="nav-item">
                        <button onClick={handleLogout} className="nav-link btn" style={navLinkStyle} id="nav-logout">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-power"
                                viewBox="0 0 16 16"
                            >
                                <path d="M7.5 1v7h1V1z" />
                                <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812" />
                            </svg>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
