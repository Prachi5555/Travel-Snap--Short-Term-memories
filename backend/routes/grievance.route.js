import express from "express"
import { verifyToken } from "../utils/verifyUser.js"
import {
  addGrievance,
  approveGrievance,
  deleteGrievance,
  deleteImage,
  filterGrievancesByStatus,
  getAllGrievances,
  getAllGrievancesAdmin,
  getApprovedGrievances,
  getGrievanceById,
  imageUpload,
  searchGrievances,
  updateGrievance
} from "../controllers/grievance.controller.js"
import upload from "../multer.js"

const router = express.Router()

router.post("/upload-image", upload.single("image"), imageUpload)

router.delete("/delete-image", deleteImage)

router.post("/add", verifyToken, addGrievance)

router.get("/all", verifyToken, getAllGrievances)

router.get("/admin/all", verifyToken, getAllGrievancesAdmin)

router.put("/admin/approve/:id", verifyToken, approveGrievance)

router.get("/get/:id", verifyToken, getGrievanceById)

router.put("/update/:id", verifyToken, updateGrievance)

router.delete("/delete/:id", verifyToken, deleteGrievance)

router.get("/search", verifyToken, searchGrievances)

router.get("/filter-by-status", verifyToken, filterGrievancesByStatus)

// Public route to get approved grievances - no authentication required
router.get("/public/approved", getApprovedGrievances)

export default router