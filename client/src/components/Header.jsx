import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // Fetch user data from localStorage on component mount
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user")); // Parse stored user data
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    // Navigate to login or profile page
    const handleProfileClick = () => {
        if (user) {
            navigate("/profile"); // Navigate to profile if logged in
        } else {
            navigate("/login"); // Navigate to login if not logged in
        }
    };

    return (
        <header className="bg-gradient-to-r from-red-500 to-black p-5">
            <nav className="flex justify-center items-center space-x-10 text-white font-bold uppercase">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/services">Services</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/book">Book Online</Link>

                {/* Profile Icon or User Avatar */}
                <button
                    onClick={handleProfileClick}
                    className="text-white hover:text-yellow-400 flex items-center space-x-2"
                >
                    {user?.avatar ? (
                        <img
                            src={user.avatar}
                            alt="User Avatar"
                            className="w-8 h-8 rounded-full border-2 border-white"
                        />
                    ) : (
                        <FaUserCircle size={24} />
                    )}
                    <span className="hidden sm:inline">
                        {user ? "Profile" : "Login"}
                    </span>
                </button>
            </nav>
        </header>
    );
};

export default Header;
