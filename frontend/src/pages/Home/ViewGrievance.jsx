import React from "react";
import { IoMdClose } from "react-icons/io";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import moment from "moment";

const ViewGrievance = ({
  grievanceInfo,
  onClose,
  onEditClick,
  onDeleteClick,
}) => {
  // Function to get status badge color based on status
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"; // Yellow for pending
      case "in_progress":
        return "bg-blue-100 text-blue-800"; // Blue for in progress
      case "resolved":
        return "bg-green-100 text-green-800"; // Green for resolved
      default:
        return "bg-gray-100 text-gray-800"; // Default gray
    }
  };

  // Function to format status text for display
  const formatStatusText = (status) => {
    switch (status) {
      case "in_progress":
        return "In Progress";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  if (!grievanceInfo) {
    return null;
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-xl font-medium text-slate-700">View Grievance</h5>

        <div className="flex items-center gap-3">
          <button
            className="btn-small"
            onClick={onEditClick}
          >
            <FaEdit className="text-lg" /> EDIT
          </button>

          <button
            className="btn-small btn-delete"
            onClick={onDeleteClick}
          >
            <FaTrashAlt className="text-lg" /> DELETE
          </button>

          <button onClick={onClose}>
            <IoMdClose className="text-xl text-slate-400" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Grievance Image */}
        {grievanceInfo.imageUrl && (
          <div className="w-full h-64 bg-slate-100">
            <img
              src={grievanceInfo.imageUrl}
              alt={grievanceInfo.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Grievance Content */}
        <div className="p-6">
          {/* Title and Status */}
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-slate-800">
              {grievanceInfo.title}
            </h2>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(
                grievanceInfo.status
              )}`}
            >
              {formatStatusText(grievanceInfo.status)}
            </span>
          </div>

          {/* Date and Location */}
          <div className="flex items-center text-sm text-slate-500 mb-6">
            <div className="flex items-center mr-4">
              <MdLocationOn className="mr-1" />
              <span>{grievanceInfo.location}</span>
            </div>
            <div>
              {grievanceInfo.grievanceDate && (
                <span>
                  {moment(parseInt(grievanceInfo.grievanceDate)).format(
                    "MMMM DD, YYYY"
                  )}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-md font-semibold text-slate-700 mb-2">
              Description
            </h3>
            <p className="text-slate-600 whitespace-pre-wrap">
              {grievanceInfo.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewGrievance;