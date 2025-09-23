import React from "react"
import moment from "moment"
import { FaLocationDot } from "react-icons/fa6"
import { FaHeart } from "react-icons/fa"

const TravelStoryCard = ({
  imageUrl,
  title,
  story,
  date,
  visitedLocation,
  isFavourite,
  onEdit,
  onClick,
  onFavouriteClick,
}) => {
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white hover:shadow-lg hover:shadow-slate-200 transition-all ease-in-out relative cursor-pointer">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-40 sm:h-56 object-cover rounded-lg"
        onClick={onClick}
      />

      <button
        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/40 rounded-lg border border-white/30 absolute top-2 sm:top-4 right-2 sm:right-4"
        onClick={onFavouriteClick}
      >
        <FaHeart
          className={`text-lg sm:text-[22px] ${
            isFavourite ? "text-red-500" : "text-white"
          } hover:text-red-500`}
        />
      </button>

      <div className="p-3 sm:p-4" onClick={onClick}>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex-1">
            <h6 className="text-sm sm:text-[16px] font-medium line-clamp-1">{title}</h6>

            <span className="text-xs text-slate-500">
              {date ? moment(date).format("Do MMM YYYY") : "-"}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 mt-1 sm:mt-2 line-clamp-2">{story}</p>

        <div className="inline-flex items-center gap-1 sm:gap-2 text-xs sm:text-[13px] text-cyan-600 bg-cyan-200/40 rounded mt-2 sm:mt-3 px-2 py-1 truncate max-w-full">
          <FaLocationDot className="text-xs sm:text-sm flex-shrink-0" />

          <span className="truncate">
            {visitedLocation.map((item, index) =>
              visitedLocation.length === index + 1 ? `${item}` : `${item}, `
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TravelStoryCard
