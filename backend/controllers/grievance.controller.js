import { fileURLToPath } from "url"
import Grievance from "../models/grievance.model.js"
import { errorHandler } from "../utils/error.js"
import path from "path"
import fs from "fs"

export const addGrievance = async (req, res, next) => {
  const { title, description, location, imageUrl } = req.body

  const userId = req.user.id

  //   validate required field
  if (!title || !description || !location || !imageUrl) {
    return next(errorHandler(400, "All fields are required"))
  }

  try {
    const grievance = new Grievance({
      title,
      description,
      location,
      userId,
      imageUrl,
    })

    await grievance.save()

    res.status(201).json({
      grievance,
      message: "Your grievance is submitted successfully!",
    })
  } catch (error) {
    next(error)
  }
}

export const getAllGrievances = async (req, res, next) => {
  const userId = req.user.id

  try {
    const grievances = await Grievance.find({ userId: userId }).sort({
      createdAt: -1,
    })

    res.status(200).json({ grievances })
  } catch (error) {
    next(error)
  }
}

export const getAllGrievancesAdmin = async (req, res, next) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return next(errorHandler(403, "Access denied. Admin only."))
    }
    
    // Get all grievances for admin, populate user information
    const grievances = await Grievance.find()
      .populate('userId', 'username email')
      .sort({ createdAt: -1 })

    res.status(200).json({ grievances })
  } catch (error) {
    next(error)
  }
}

export const approveGrievance = async (req, res, next) => {
  const { id } = req.params
  
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return next(errorHandler(403, "Access denied. Admin only."))
    }
    
    const grievance = await Grievance.findById(id)
    
    if (!grievance) {
      return next(errorHandler(404, "Grievance not found"))
    }
    
    // Update the isApproved status
    const updatedGrievance = await Grievance.findByIdAndUpdate(
      id,
      {
        $set: {
          isApproved: req.body.isApproved
        },
      },
      { new: true }
    )
    
    res.status(200).json(updatedGrievance)
  } catch (error) {
    next(error)
  }
}

export const getGrievanceById = async (req, res, next) => {
  const { id } = req.params
  const userId = req.user.id

  try {
    const grievance = await Grievance.findOne({
      _id: id,
      userId: userId,
    })

    if (!grievance) {
      return next(errorHandler(404, "Grievance not found"))
    }

    res.status(200).json({ grievance })
  } catch (error) {
    next(error)
  }
}

export const updateGrievance = async (req, res, next) => {
  const { id } = req.params
  const userId = req.user.id

  try {
    const grievance = await Grievance.findById(id)

    if (!grievance) {
      return next(errorHandler(404, "Grievance not found"))
    }

    if (grievance.userId.toString() !== userId) {
      return next(errorHandler(403, "You can only update your own grievance"))
    }

    const updatedGrievance = await Grievance.findByIdAndUpdate(
      id,
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          location: req.body.location,
          status: req.body.status,
          imageUrl: req.body.imageUrl,
          grievanceDate: req.body.grievanceDate,
        },
      },
      { new: true }
    )

    res.status(200).json(updatedGrievance)
  } catch (error) {
    next(error)
  }
}

export const deleteGrievance = async (req, res, next) => {
  const { id } = req.params
  const userId = req.user.id

  try {
    const grievance = await Grievance.findOne({
      _id: id,
      userId: userId,
    })

    if (!grievance) {
      return next(errorHandler(404, "Grievance not found"))
    }

    // Delete the associated image if it exists
    if (grievance.imageUrl) {
      const __filename = fileURLToPath(import.meta.url)
      const __dirname = path.dirname(__filename)
      const imagePath = path.join(
        __dirname,
        "../uploads/",
        path.basename(grievance.imageUrl)
      )

      // Check if file exists before deleting
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath)
      }
    }

    await Grievance.findByIdAndDelete(id)

    res.status(200).json({ message: "Grievance deleted successfully" })
  } catch (error) {
    next(error)
  }
}

// Handle image upload for grievances
// export const imageUpload = (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No image file provided" })
//     }

//     // Create full URL for the image including the backend domain
//     const baseUrl = process.env.NODE_ENV === 'production' 
//       ? 'https://travelsnapbackend.onrender.com' 
//       : 'http://localhost:5000';
    
//     const imageUrl = `${baseUrl}/uploads/${req.file.filename}`

//     res.status(200).json({
//       imageUrl,
//       message: "Image uploaded successfully",
//     })
//   } catch (error) {
//     res.status(500).json({ message: "Error uploading image" })
//   }
// }
export const imageUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(errorHandler(400, "No image uploaded"));
    }

    // Multer-Cloudinary gives you the secure Cloudinary URL
    const imageUrl = req.file.path;

    res.status(201).json({
      imageUrl,
      message: "Image uploaded successfully!",
    });
  } catch (error) {
    next(error);
  }
};


// Delete an image
export const deleteImage = (req, res) => {
  const { filename } = req.body

  if (!filename) {
    return res.status(400).json({ message: "Filename is required" })
  }

  try {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const imagePath = path.join(__dirname, "../uploads/", filename)

    // Check if file exists before deleting
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath)
      res.status(200).json({ message: "Image deleted successfully" })
    } else {
      res.status(404).json({ message: "Image not found" })
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting image" })
  }
}

// Search grievances
export const searchGrievances = async (req, res, next) => {
  const { query } = req.query
  const userId = req.user.id

  if (!query) {
    return next(errorHandler(404, "Query is required!"))
  }

  try {
    const searchResults = await Grievance.find({
      userId: userId,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
      ],
    }).sort({ createdAt: -1 })

    res.status(200).json({
      grievances: searchResults,
    })
  } catch (error) {
    next(error)
  }
}

export const filterGrievancesByStatus = async (req, res, next) => {
  const { status } = req.query
  const userId = req.user.id

  try {
    const filteredGrievances = await Grievance.find({
      userId: userId,
      status: status,
    }).sort({ createdAt: -1 })

    res.status(200).json({ grievances: filteredGrievances })
  } catch (error) {
    next(error)
  }
}

// Public endpoint to get approved grievances without authentication
export const getApprovedGrievances = async (req, res, next) => {
  try {
    // Find all grievances where isApproved is true
    const approvedGrievances = await Grievance.find({ isApproved: true })
      .populate('userId', 'username') // Only include username from user data
      .sort({ createdAt: -1 })

    res.status(200).json({ grievances: approvedGrievances })
  } catch (error) {
    next(error)
  }
}