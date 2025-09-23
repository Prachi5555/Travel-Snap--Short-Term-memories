import express from "express"
import grievanceRoutes from "./grievance.route.js"

const router = express.Router()

// Redirect all complaint routes to grievance routes for backward compatibility
router.use("/", grievanceRoutes)

export default router