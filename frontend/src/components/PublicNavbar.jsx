import React from "react";
import { Link } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-2 sm:py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/public" className="text-lg sm:text-xl font-bold">
            TravelSnap Public
          </Link>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link to="/login" className="text-sm sm:text-base hover:text-blue-200 px-2 py-1 sm:px-3 sm:py-1">
            Login
          </Link>
          <Link to="/sign-up" className="text-sm sm:text-base hover:text-blue-200 bg-blue-700 px-2 py-1 sm:px-3 sm:py-1 rounded">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;