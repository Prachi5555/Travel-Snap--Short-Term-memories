import express from "express"
import { signin, signup, verifyAdmin } from "../controllers/auth.controller.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/verify-admin", verifyAdmin)

export default router
