import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-200 pt-8 pb-6">
    <div className="container mx-auto px-4">
        <div className="text-left">
            <h4 className="text-3xl font-semibold text-gray-700">Let's keep in touch!</h4>
            <p className="text-lg mt-2 mb-4 text-gray-600">
                Find us on any of these platforms, we respond in 1-2 business days.
            </p>
            <div className="flex space-x-4">
                <Link to="#" className="bg-white text-blue-400 p-3 rounded-full shadow-md">
                    <i className="fab fa-twitter"></i>
                </Link>
                <Link to="#" className="bg-white text-blue-600 p-3 rounded-full shadow-md">
                    <i className="fab fa-facebook-square"></i>
                </Link>
                <Link to="#" className="bg-white text-pink-400 p-3 rounded-full shadow-md">
                    <i className="fab fa-dribbble"></i>
                </Link>
                <Link to="#" className="bg-white text-gray-800 p-3 rounded-full shadow-md">
                    <i className="fab fa-github"></i>
                </Link>
            </div>
        </div>

        <div className="flex flex-wrap justify-between items-center mt-8 border-t border-gray-300 pt-6">
            <div className="text-sm text-gray-500">
                &copy; 2021 <Link to="https://www.creative-tim.com" className="hover:text-gray-800">
                    Creative Tim
                </Link>. All rights reserved.
            </div>
            <div className="flex space-x-6">
                <Link to="#" className="text-sm text-gray-500 hover:text-gray-800">About Us</Link>
                <Link to="#" className="text-sm text-gray-500 hover:text-gray-800">Blog</Link>
                <Link to="#" className="text-sm text-gray-500 hover:text-gray-800">GitHub</Link>
                <Link to="#" className="text-sm text-gray-500 hover:text-gray-800">Contact</Link>
            </div>
        </div>
    </div>
</footer>
  )
}

export default Footer;

