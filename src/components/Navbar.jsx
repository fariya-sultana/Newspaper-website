import { NavLink, Link } from 'react-router';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
    const { user, logOut, isAdmin, isPremium } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const getNavLinkClass = ({ isActive }) =>
        isActive
            ? 'px-3 py-2 text-blue-600  font-semibold'
            : 'px-3 py-2 text-gray-700 hover:text-blue-600';

    const navLinks = (
        <>
            <NavLink to="/" className={getNavLinkClass}>Home</NavLink>
            <NavLink to="/articles" className={getNavLinkClass}>All Articles</NavLink>
            {user && (
                <>
                    <NavLink to="/add-article" className={getNavLinkClass}>Add Article</NavLink>
                    <NavLink to="/subscription" className={getNavLinkClass}>Subscription</NavLink>
                    <NavLink to="/my-articles" className={getNavLinkClass}>My Articles</NavLink>
                    {isPremium && (
                        <NavLink to="/premium-articles" className={getNavLinkClass}>Premium Articles</NavLink>
                    )}
                    {isAdmin && (
                        <NavLink to="/dashboard" className={getNavLinkClass}>Dashboard</NavLink>
                    )}
                </>
            )}
        </>
    );

    return (
        <nav className="bg-white border-b shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* LEFT (Logo) */}
                <div className="flex items-center gap-2">
                    <Link to="/" className="text-xl lg:text-2xl font-bold text-blue-600">📰 NewsWave</Link>
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
                                    className="w-9 h-9 rounded-full border"
                                />
                            </Link>
                            <button
                                onClick={logOut}
                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className="border-blue-600 text-blue-600  px-3 py-1 rounded border">Login</NavLink>
                            <NavLink
                                to="/register"
                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                            >
                                Register
                            </NavLink>
                        </>
                    )}
                </div>

                {/* RIGHT (Mobile Menu Button) */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-xl">
                        ☰
                    </button>
                </div>
            </div>

            {/* Mobile/Tablet Slide Down Menu */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow">
                    {user && (
                        <Link to="/profile" className="block text-center">
                            <img
                                src={user?.photoURL}
                                alt="Profile"
                                className="w-10 h-10 rounded-full mx-auto border mb-2"
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
                                    logOut();
                                }}
                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <NavLink to="/login" className="block bg-blue-600 text-white py-1 rounded hover:bg-blue-700 mb-2">Login</NavLink>
                                <NavLink
                                    to="/register"
                                    className="block bg-blue-600 text-white py-1 rounded hover:bg-blue-700"
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
