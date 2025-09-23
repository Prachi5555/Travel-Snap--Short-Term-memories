import axiosInstance from "./axiosInstance"

const uploadImage = async (imageFile, type = "travel") => {
  const formData = new FormData()
  formData.append("image", imageFile)

  // Choose the correct endpoint based on the content type
  const endpoint = type === "grievance" 
    ? "/grievance/upload-image" 
    : "/travel-story/image-upload";

  try {
    const response = await axiosInstance.post(
      endpoint,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // set header for the file upload
        },
        withCredentials: true, // ensure cookies are sent with the request
      }
    )

    return response.data
  } catch (error) {
    console.log(`Error uploading ${type} image:`, error)
    throw error // rethrow error for handling
  }
}

export default uploadImage
