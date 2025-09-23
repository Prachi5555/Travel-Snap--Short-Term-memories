import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import grievanceService from "../../services/grievanceService";
import moment from "moment";
import { MdLocationOn } from "react-icons/md";
import PublicNavbar from "../../components/PublicNavbar";

const PublicGrievances = () => {
  const [approvedGrievances, setApprovedGrievances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApprovedGrievances();
  }, []);

  const fetchApprovedGrievances = async () => {
    setLoading(true);
    try {
      const data = await grievanceService.getApprovedGrievances();
      if (data && data.grievances) {
        setApprovedGrievances(data.grievances);
      } else {
        setApprovedGrievances([]);
      }
    } catch (error) {
      toast.error("Error fetching approved grievances");
      console.error("Error fetching approved grievances:", error);
      setApprovedGrievances([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PublicNavbar />
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Public Grievances</h1>
      </div>

      {loading ? (
        <div className="text-center py-4 sm:py-8">
          <p>Loading approved grievances...</p>
        </div>
      ) : approvedGrievances.length === 0 ? (
        <div className="text-center py-4 sm:py-8">
          <p>No approved grievances found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {approvedGrievances.map((grievance) => (
            <div
              key={grievance._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {grievance.imageUrl && (
                <div className="h-40 sm:h-48 overflow-hidden">
                  <img
                    src={grievance.imageUrl}
                    alt={grievance.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-3 sm:p-4">
                <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 line-clamp-1">{grievance.title}</h2>
                <p className="text-gray-600 mb-2 sm:mb-3 text-sm sm:text-base line-clamp-2">{grievance.description}</p>
                <div className="flex items-center text-gray-500 mb-1 sm:mb-2 text-xs sm:text-sm">
                  <MdLocationOn className="mr-1 flex-shrink-0" />
                  <span className="truncate">{grievance.location}</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm text-gray-500">
                  <span className="truncate mr-2">Posted by: {grievance.userId?.username || "Anonymous"}</span>
                  <span className="flex-shrink-0">
                    {moment(grievance.createdAt).format("MMM D, YYYY")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
    </>
  );
};

export default PublicGrievances;