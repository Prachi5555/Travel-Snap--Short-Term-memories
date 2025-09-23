import React from "react";
import { Link } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/public" className="text-xl font-bold">
            TravelSnap Public
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/login" className="hover:text-blue-200">
            Login
          </Link>
          <Link to="/sign-up" className="hover:text-blue-200">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;