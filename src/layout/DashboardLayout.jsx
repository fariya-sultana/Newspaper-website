import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { FaUsers, FaNewspaper, FaBuilding, FaBars, FaTimes, FaHome, FaChartPie } from 'react-icons/fa';
import logo from '/logo.jpeg';
const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(prev => !prev);
    const closeSidebar = () => setSidebarOpen(false);

    const linkClass = ({ isActive }) =>
        isActive
            ? 'flex items-center gap-2 px-4 py-2 mb-2 text-blue-600 font-semibold bg-blue-100 dark:bg-gray-700 dark:text-white rounded'
            : 'flex items-center gap-2 px-4 py-2 mb-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded';

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            {/* Top Bar */}
            <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md md:hidden">
                <button onClick={toggleSidebar} className="text-xl text-gray-800 dark:text-gray-200">
                    <FaBars />
                </button>
                <div className="flex items-center gap-2">
                    <Link to="/" className="text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400 inline-flex items-center gap-2"><img className='w-6 md:w-10' src={logo} alt="" /> NewsPress</Link>
                </div>

            </div>

            {/* Sidebar - Desktop */}
            <aside className="w-64 bg-white dark:bg-gray-800 shadow-md hidden md:block">
                <div className="p-6 text-xl font-bold border-b border-gray-200 dark:border-gray-700">
                    Admin Dashboard
                </div>
                <nav className="p-4">
                    <NavLink to="/" className={linkClass}>
                        <FaHome /> Back Home
                    </NavLink>
                    <NavLink to="charts" className={linkClass}>
                        <FaChartPie /> Charts
                    </NavLink>
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
                    <aside className="relative w-64 bg-white dark:bg-gray-800 shadow-md z-50 p-4">
                        <button
                            onClick={closeSidebar}
                            className="absolute top-4 right-4 text-xl text-gray-800 dark:text-gray-200"
                        >
                            <FaTimes />
                        </button>
                        <div className="text-xl font-bold mb-4">Admin Dashboard</div>
                        <nav>
                            <NavLink to="/" className={linkClass} onClick={closeSidebar}>
                                <FaHome /> Back Home
                            </NavLink>
                            <NavLink to="charts" className={linkClass}>
                                <FaChartPie /> Charts
                            </NavLink>
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
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
