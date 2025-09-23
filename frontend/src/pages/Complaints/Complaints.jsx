// src/pages/Complaints/Complaints.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Complaints = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the GrievanceHome page
    navigate("/", { replace: true });
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg">Redirecting to 📷 Capture & Share...</p>
    </div>
  );
};

export default Complaints;
