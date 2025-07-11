// src/layout/DashboardLayout.jsx

import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import { FaUsers, FaNewspaper, FaBuilding, FaBars, FaTimes } from 'react-icons/fa';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(prev => !prev);
    const closeSidebar = () => setSidebarOpen(false);

    const linkClass = ({ isActive }) =>
        isActive
            ? 'flex items-center gap-2 px-4 py-2 mb-2 text-blue-600 font-semibold bg-blue-50 rounded'
            : 'flex items-center gap-2 px-4 py-2 mb-2 hover:bg-gray-100 rounded';

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            {/* Top Bar */}
            <div className="flex items-center justify-between p-4 bg-white shadow-md md:hidden">
                <button onClick={toggleSidebar} className="text-xl">
                    <FaBars />
                </button>
                <h1 className="text-xl font-bold">📰 NewsPress</h1>
            </div>

            {/* Sidebar - Desktop */}
            <aside className="w-64 bg-white shadow-md hidden md:block">
                <div className="p-6 text-xl font-bold border-b">Admin Dashboard</div>
                <nav className="p-4">
                    <NavLink to="users" className={linkClass}>
                        <FaUsers /> All Users
                    </NavLink>
                    <NavLink to="articles" className={linkClass}>
                        <FaNewspaper /> All Articles
                    </NavLink>
                    <NavLink to="publishers" className={linkClass}>
                        <FaBuilding /> Add Publisher
                    </NavLink>
                </nav>
            </aside>

            {/* Sidebar - Mobile/Tablet */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 flex">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-40"
                        onClick={closeSidebar}
                    ></div>

                    {/* Sidebar panel */}
                    <aside className="relative w-64 bg-white shadow-md z-50 p-4">
                        <button
                            onClick={closeSidebar}
                            className="absolute top-4 right-4 text-xl"
                        >
                            <FaTimes />
                        </button>
                        <div className="text-xl font-bold mb-4">Admin Dashboard</div>
                        <nav>
                            <NavLink to="users" className={linkClass} onClick={closeSidebar}>
                                <FaUsers /> All Users
                            </NavLink>
                            <NavLink to="articles" className={linkClass} onClick={closeSidebar}>
                                <FaNewspaper /> All Articles
                            </NavLink>
                            <NavLink to="publishers" className={linkClass} onClick={closeSidebar}>
                                <FaBuilding /> Add Publisher
                            </NavLink>
                        </nav>
                    </aside>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
