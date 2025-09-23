

import React from "react";
import moment from "moment";
import { MdLocationOn } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const TravelSnapCard = ({
  imageUrl,
  title,
  description,
  date,
  location,
  onEdit,
  onClick,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-slate-200 hover:shadow-xl transition-shadow duration-300">
      {/* Card Header with Image */}
      <div className="relative h-40 sm:h-48 bg-slate-200">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-100">
            <span className="text-slate-400">No Image</span>
          </div>
        )}

        {/* Edit Button */}
        <button
          className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-white p-1.5 sm:p-2 rounded-full shadow-md hover:bg-slate-50"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          <FaEdit className="text-slate-600 text-sm sm:text-base" />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-3 sm:p-4 cursor-pointer" onClick={onClick}>
        <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-1 sm:mb-2 line-clamp-1">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 mb-2 sm:mb-3 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center truncate mr-2">
            <MdLocationOn className="mr-1 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
          <div className="flex-shrink-0">
            {date && (
              <span>{moment(parseInt(date)).format("MMM DD, YYYY")}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelSnapCard;
