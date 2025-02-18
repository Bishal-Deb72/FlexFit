import React from "react";
import { FaFacebook,FaInstagram,FaXTwitter  } from "react-icons/fa6";

function Footer() {
  return (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-gradient-to-r from-red-600 to-black px-4 md:px-6 flex items-center justify-between z-50">
      {/* Left Section: Site Info */}
      <div className="flex items-center space-x-4 text-white text-sm md:text-base">
        <p>&copy; 2025 FITNESS AI. All rights reserved.</p>
      </div>

      {/* Center Section: Navigation Links */}
      <div className="hidden md:flex items-end space-x-6 text-white text-sm md:text-base ml-auto">
        <FaFacebook size={24}/>
        <FaInstagram size={24}/>
        <FaXTwitter size={24}/>
      </div>

      {/* Right Section: Social Media Icons */}
      <div className="flex items-center space-x-4 text-white">
        <a href="#facebook" className="hover:text-gray-400">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#twitter" className="hover:text-gray-400">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#instagram" className="hover:text-gray-400">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </div>
  );
}

export default Footer;
