import React from "react";
import { Link } from "react-router-dom"; // If you're using React Router

const AdminNavbar = () => {

    const handleLogout = () => {
        // Clear token from localStorage or cookies
        localStorage.removeItem('token');  // Example if you're storing token in localStorage
        localStorage.removeItem('role');
    
        // Optionally, redirect to login page
        window.location.href = '/';
    };

  return (
    <nav className="sticky top-0 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">Admin Panel</div>
        <div className="flex space-x-6">
          <Link 
            to="/admin" 
            className="py-2 px-6 bg-purple-600 rounded-full hover:bg-purple-700 transition duration-200 text-white text-center"
          >
            Create Store
          </Link>
          <Link 
            to="/admin/orders" 
            className="py-2 px-6 bg-pink-600 rounded-full hover:bg-pink-700 transition duration-200 text-white text-center"
          >
            Order Management
          </Link>
          <button 
            onClick={handleLogout} 
            className="py-2 px-6 bg-red-600 rounded-full hover:bg-red-700 transition duration-200 text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
