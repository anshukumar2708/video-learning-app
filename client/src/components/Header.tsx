import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuth, getUser, logout } from "../utils/auth";

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const user = getUser();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-bold text-brand-500 hover:text-brand-700 transition-colors"
                >
                    LearnHub
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-6 text-gray-700">
                    <Link to="/" className="hover:text-brand-500">Home</Link>
                    <Link to="/courses" className="hover:text-brand-500">Courses</Link>
                    {isAuth() && (
                        <>
                            <Link to="/my-courses" className="hover:text-brand-500">My Courses</Link>
                            <Link to="/cart" className="hover:text-brand-500">Cart</Link>
                            <Link to="/profile" className="hover:text-brand-500">Profile</Link>
                        </>
                    )}
                </nav>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center space-x-3">
                    {isAuth() ? (
                        <>
                            <span className="text-sm text-gray-600">Hi, {user?.name}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-brand-500 font-medium hover:underline"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-brand-500 text-white px-3 py-1 rounded hover:bg-brand-600"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-700 focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        {menuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-3">
                    <Link to="/" className="block hover:text-brand-500" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/courses" className="block hover:text-brand-500" onClick={() => setMenuOpen(false)}>Courses</Link>
                    {isAuth() && (
                        <>
                            <Link to="/my-courses" className="block hover:text-brand-500" onClick={() => setMenuOpen(false)}>My Courses</Link>
                            <Link to="/cart" className="block hover:text-brand-500" onClick={() => setMenuOpen(false)}>Cart</Link>
                            <Link to="/profile" className="block hover:text-brand-500" onClick={() => setMenuOpen(false)}>Profile</Link>
                        </>
                    )}

                    {isAuth() ? (
                        <button
                            onClick={() => {
                                handleLogout();
                                setMenuOpen(false);
                            }}
                            className="w-full text-left text-red-500 font-medium"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="block hover:text-brand-500" onClick={() => setMenuOpen(false)}>Login</Link>
                            <Link to="/register" className="block hover:text-brand-500" onClick={() => setMenuOpen(false)}>Sign Up</Link>
                        </>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;
