import React from "react";
import { Link } from "react-router-dom";

const StoreNavbar = () => {
  const handleLogout = () => {
    // Clear token from localStorage or cookies
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Redirect to login page
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 bg-gradient-to-r from-purple-500 to-pink-500 border-b border-gray-200 text-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand Name */}
        <div className="text-xl font-bold tracking-wide text-white">
          Store Dashboard
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <Link
            to="/store/add-order"
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 transition-all"
          >
            Add Order
          </Link>
          <Link
            to="/store"
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 transition-all"
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 focus:ring-2 focus:ring-red-400 transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default StoreNavbar;
