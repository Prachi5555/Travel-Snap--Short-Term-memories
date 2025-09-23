

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/Navbar";
import adminService from "../../services/adminService";
import moment from "moment";
import { MdLocationOn } from "react-icons/md";

const AdminPage = () => {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllGrievances();
  }, []);

  const fetchAllGrievances = async () => {
    try {
      setLoading(true);
      const response = await adminService.getAllGrievances();
      if (response && response.grievances) {
        setGrievances(response.grievances);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching grievances:", error);
      toast.error("Failed to load grievances");
      setLoading(false);
    }
  };

  const handleApprovalToggle = async (grievance) => {
    try {
      const newApprovalStatus = !grievance.isApproved;
      await adminService.approveGrievance(grievance._id, newApprovalStatus);

      // Update local state
      setGrievances((prevGrievances) =>
        prevGrievances.map((g) =>
          g._id === grievance._id ? { ...g, isApproved: newApprovalStatus } : g
        )
      );

      toast.success(
        `Post ${newApprovalStatus ? "approved for" : "removed from"} main page`
      );
    } catch (error) {
      console.error("Error updating approval status:", error);
      toast.error("Failed to update approval status");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">All User Posts</h2>

          {loading ? (
            <div className="text-center py-8">
              <p>Loading posts...</p>
            </div>
          ) : grievances.length === 0 ? (
            <div className="text-center py-8">
              <p>No posts found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Post
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Approved
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {grievances.map((grievance) => (
                    <tr key={grievance._id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {grievance.imageUrl && (
                            <img
                              src={grievance.imageUrl}
                              alt={grievance.title}
                              className="h-10 w-10 rounded-full mr-3 object-cover"
                            />
                          )}
                          <div>
                            <div className="font-medium text-gray-900">
                              {grievance.title}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <MdLocationOn className="mr-1" />
                              {grievance.location}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {grievance.userId?.username || "Unknown"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {grievance.userId?.email || "No email"}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {moment(grievance.grievanceDate).format("MMM DD, YYYY")}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            grievance.isApproved
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {grievance.isApproved ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <button
                          onClick={() => handleApprovalToggle(grievance)}
                          className={`px-3 py-1 rounded text-white ${
                            grievance.isApproved
                              ? "bg-red-500 hover:bg-red-600"
                              : "bg-green-500 hover:bg-green-600"
                          }`}
                        >
                          {grievance.isApproved
                            ? "Remove from Main Page"
                            : "Approve for Main Page"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AdminPage;
