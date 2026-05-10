// frontend/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AuditFlow
              </span>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-6">
                <a href="#features" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">Features</a>
                <a href="#tech-stack" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">Tech Stack</a>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">Log in</Link>
            <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;