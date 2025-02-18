import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/login'); // Navigate to the login page
    };

    return (
        <header className="bg-gradient-to-r from-red-500 to-black p-5">
            <nav className="flex justify-center items-center space-x-10 text-white font-bold uppercase">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/services">Services</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/book">Book Online</Link>
                {/* Profile Icon */}
                <button
                    onClick={handleProfileClick}
                    className="text-white hover:text-yellow-400 flex items-center space-x-2"
                >
                    <FaUserCircle size={24} />
                    <span className="hidden sm:inline">Login</span>
                </button>
            </nav>
        </header>
    );
};

export default Header;