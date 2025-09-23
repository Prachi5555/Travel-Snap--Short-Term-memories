

import React, { useState } from "react"
import { IoMdAdd, IoMdClose } from "react-icons/io"
import { MdOutlineDeleteOutline, MdOutlineUpdate } from "react-icons/md"
import DateSelector from "./DateSelector"
import ImageSelector from "./ImageSelector"
import axiosInstance from "../utils/axiosInstance"
import moment from "moment"
import { toast } from "react-toastify"
import uploadImage from "../utils/uploadImage"

const AddEditGrievance = ({
  grievanceInfo,
  type,
  onClose,
  getAllGrievances,
}) => {
  const [grievanceDate, setGrievanceDate] = useState(grievanceInfo?.grievanceDate || null)
  const [title, setTitle] = useState(grievanceInfo?.title || "")
  const [grievanceImg, setGrievanceImg] = useState(grievanceInfo?.imageUrl || null)
  const [description, setDescription] = useState(grievanceInfo?.description || "")
  const [location, setLocation] = useState(grievanceInfo?.location || "")

  const [error, setError] = useState("")

  const addNewGrievance = async () => {
    try {
      let imageUrl = ""

      // Upload image if present
      if (grievanceImg) {
        const imgUploadRes = await uploadImage(grievanceImg, "grievance")
        imageUrl = imgUploadRes.imageUrl || ""
      }

      const response = await axiosInstance.post("/grievance/add", {
        title,
        description,
        imageUrl: imageUrl || "",
        location,
        grievanceDate: grievanceDate
          ? moment(grievanceDate).valueOf()
          : moment().valueOf(),
      })

      if (response.data && response.data.grievance) {
        toast.success("Snap added successfully!")
        getAllGrievances()
        onClose()
      }
    } catch (error) {
      console.log(error)
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong! Please try again.")
      }
    }
  }

  const updateGrievance = async () => {
    const grievanceId = grievanceInfo._id

    try {
      let imageUrl = ""

      let postData = {
        title,
        description,
        imageUrl: grievanceInfo.imageUrl || "",
        location,
        grievanceDate: grievanceDate
          ? moment(grievanceDate).valueOf()
          : moment().valueOf(),
      }

      if (typeof grievanceImg === "object") {
        // Upload new image
        const imageUploadRes = await uploadImage(grievanceImg, "grievance")
        imageUrl = imageUploadRes.imageUrl || ""
        postData = {
          ...postData,
          imageUrl: imageUrl,
        }
      }

      const response = await axiosInstance.put(
        "/grievance/update/" + grievanceId,
        postData
      )

      if (response.data && response.data.grievance) {
        toast.success("Snap updated successfully!")
        getAllGrievances()
        onClose()
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong! Please try again.")
      }
    }
  }

  const handleAddOrUpdateClick = () => {
    if (!title) {
      setError("Please enter the title")
      return
    }
    if (!description) {
      setError("Please enter the description")
      return
    }
    if (!location) {
      setError("Please enter the location")
      return
    }

    setError("")

    if (type === "edit") {
      updateGrievance()
    } else {
      addNewGrievance()
    }
  }

  const handleDeleteGrievanceImage = async () => {
    // Deleting the image
    const deleteImageResponse = await axiosInstance.delete(
      "/grievance/delete-image",
      {
        params: {
          imageUrl: grievanceInfo.imageUrl,
        },
      }
    )

    if (deleteImageResponse.data) {
      const grievanceId = grievanceInfo._id

      const postData = {
        title,
        description,
        location,
        grievanceDate: moment().valueOf(),
        imageUrl: "",
      }

      // updating grievance
      const response = await axiosInstance.put(
        "/grievance/update/" + grievanceId,
        postData
      )

      if (response.data) {
        toast.success("Snap image deleted successfully")
        setGrievanceImg(null)
        getAllGrievances()
      }
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-medium text-slate-700">
          {type === "add" ? "Add Snap" : "Update Snap"}
        </h5>

        <div>
          <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
            {type === "add" ? (
              <button className="btn-small" onClick={handleAddOrUpdateClick}>
                <IoMdAdd className="text-lg" /> ADD SNAP
              </button>
            ) : (
              <>
                <button className="btn-small" onClick={handleAddOrUpdateClick}>
                  <MdOutlineUpdate className="text-lg" /> UPDATE SNAP
                </button>

                <button className="btn-small btn-delete">
                  <MdOutlineDeleteOutline className="text-lg" /> DELETE SNAP
                </button>
              </>
            )}

            <button className="" onClick={onClose}>
              <IoMdClose className="text-xl text-slate-400" />
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-xs pt-2 text-right">{error}</p>
          )}
        </div>
      </div>

      <div>
        <div className="flex flex-1 flex-col gap-2 pt-4">
          <label className="input-label">TITLE</label>
          <input
            type="text"
            className="text-2xl text-slate-900 outline-none"
            placeholder="Describe this adventure…"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="my-3">
            <DateSelector date={grievanceDate} setDate={setGrievanceDate} />
          </div>

          <ImageSelector
            image={grievanceImg}
            setImage={setGrievanceImg}
            handleDeleteImage={handleDeleteGrievanceImage}
          />

          <div className="flex flex-col gap-2 mt-4">
            <label className="input-label">DESCRIPTION</label>
            <textarea
              type="text"
              className="text-sm text-slate-950 outline-none bg-slate-100 p-2 rounded-sm"
              placeholder="Describe your TravelSnap..."
              rows={10}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label className="input-label">LOCATION</label>
            <input
              type="text"
              className="text-sm text-slate-950 outline-none bg-slate-100 p-2 rounded-sm"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEditGrievance
