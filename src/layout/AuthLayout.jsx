import React from 'react';
import { Outlet, Link } from 'react-router';
import loginImg from '../assets/undraw_login_weas.png';
import logo from '/logo.jpeg';

const AuthLayout = () => {
    return (
        <div className='relative'>
            <div className='absolute top-6 left-12 z-10 '>
                {/* Logo and Site Name */}
                <Link to="/" className="text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400 inline-flex items-center gap-2"><img className='w-10' src={logo} alt="" /> NewsPress</Link>
            </div>

            <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                {/* LEFT: Auth Form and Logo */}
                <div className=" justify-center">

                    {/* Auth Form */}
                    <Outlet />
                </div>

                {/* RIGHT: Image (hidden on small screens) */}
                <div className="hidden md:flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                    <img src={loginImg} alt="Login illustration" className="w-4/5 max-w-md" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
