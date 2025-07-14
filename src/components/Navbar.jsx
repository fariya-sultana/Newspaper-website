import { NavLink, Link, useNavigate } from 'react-router';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { user, logOut, isPremium } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { role } = useUserRole();

    const getNavLinkClass = ({ isActive }) =>
        isActive
            ? 'px-3 py-2 text-blue-600 dark:text-blue-400 font-semibold'
            : 'px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400';

    const navLinks = (
        <>
            <NavLink to="/" className={getNavLinkClass}>Home</NavLink>
            <NavLink to="/all-article" className={getNavLinkClass}>All Articles</NavLink>
            {user && (
                <>
                    <NavLink to="/add-article" className={getNavLinkClass}>Add Article</NavLink>
                    <NavLink to="/subscription" className={getNavLinkClass}>Subscription</NavLink>
                    <NavLink to="/my-articles" className={getNavLinkClass}>My Articles</NavLink>
                    {(isPremium) && (
                        <NavLink to="/premium-articles" className={getNavLinkClass}>Premium Articles</NavLink>
                    )}
                    {role === 'admin' && (
                        <NavLink to="/dashboard" className={getNavLinkClass}>Dashboard</NavLink>
                    )}
                </>
            )}
        </>
    );

    const handleLogout = async () => {
        try {
            await logOut();
            toast.success("Logged out successfully");
            navigate("/login");
        } catch (error) {
            console.error(error)
            toast.error("Logout failed");
        }
    };

    return (
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* LEFT (Logo) */}
                <div className="flex items-center gap-2">
                    <Link to="/" className="text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400">📰 NewsPress</Link>
                </div>

                {/* CENTER (Desktop Nav Links) */}
                <div className="hidden md:flex justify-center flex-1">
                    <div className="flex space-x-2">{navLinks}</div>
                </div>

                {/* RIGHT (Desktop Auth Buttons) */}
                <div className="hidden md:flex items-center gap-3">
                    {user ? (
                        <>
                            <Link to="/profile">
                                <img
                                    src={user?.photoURL}
                                    alt="Profile"
                                    className="w-9 h-9 rounded-full border dark:border-gray-600"
                                />
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-blue-600 dark:bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 dark:hover:bg-blue-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className="border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 px-3 py-1 rounded">Login</NavLink>
                            <NavLink
                                to="/register"
                                className="bg-blue-600 dark:bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 dark:hover:bg-blue-600"
                            >
                                Register
                            </NavLink>
                        </>
                    )}
                </div>

                {/* RIGHT (Mobile Menu Button) */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-xl text-gray-700 dark:text-gray-300">
                        ☰
                    </button>
                </div>
            </div>

            {/* Mobile/Tablet Slide Down Menu */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2 bg-white dark:bg-gray-900 shadow">
                    {user && (
                        <Link to="/profile" className="block text-center">
                            <img
                                src={user?.photoURL}
                                alt="Profile"
                                className="w-10 h-10 rounded-full mx-auto border dark:border-gray-600 mb-2"
                            />
                        </Link>
                    )}
                    <div className="flex flex-col space-y-2 text-center">
                        {navLinks}
                    </div>
                    <div className="pt-3 text-center">
                        {user ? (
                            <button
                                onClick={() => {
                                    setMenuOpen(false);
                                    handleLogout();
                                }}
                                className="bg-blue-600 dark:bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 dark:hover:bg-blue-600"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <NavLink to="/login" className="block bg-blue-600 dark:bg-blue-500 text-white py-1 rounded hover:bg-blue-700 dark:hover:bg-blue-600 mb-2">Login</NavLink>
                                <NavLink
                                    to="/register"
                                    className="block bg-blue-600 dark:bg-blue-500 text-white py-1 rounded hover:bg-blue-700 dark:hover:bg-blue-600"
                                >
                                    Register
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
