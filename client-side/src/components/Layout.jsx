import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <div style={{ minHeight: '100vh', minWidth: '100vw' }}>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <Sidebar className="col-md-3 col-lg-2 d-md-block bg-light sidebar" />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4" style={{ marginTop: '230px' }}>
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    )
}
