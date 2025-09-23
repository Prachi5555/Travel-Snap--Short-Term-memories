

// import express from "express"
// import mongoose from "mongoose"
// import dotenv from "dotenv"
// import cookieParser from "cookie-parser"
// import path from "path"
// import cors from "cors"
// import { fileURLToPath } from "url"
// import { v2 as cloudinary } from "cloudinary"
// import multer from "multer"
// import { CloudinaryStorage } from "multer-storage-cloudinary"

// // Routes
// import authRoutes from "./routes/auth.route.js"
// import userRoutes from "./routes/user.route.js"
// import travelStoryRoutes from "./routes/travelStory.route.js"
// import complaintRoutes from "./routes/complaint.route.js"
// import grievanceRoutes from "./routes/grievance.route.js"

// dotenv.config()

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ Database is connected")
//   })
//   .catch((err) => {
//     console.log("❌ MongoDB Connection Error:", err)
//   })

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// })

// // Multer + Cloudinary Storage
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "travel-diary-app", // Cloudinary folder
//     allowed_formats: ["jpg", "jpeg", "png", "webp"],
//   },
// })
// const upload = multer({ storage })

// const app = express()

// // Enable CORS for frontend
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "http://localhost:5174"], // Replace with frontend URLs
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//     exposedHeaders: ['set-cookie']
//   })
// )

// app.use(cookieParser())
// app.use(express.json())

// // Routes
// app.use("/api/auth", authRoutes)
// app.use("/api/user", userRoutes)
// app.use("/api/travel-story", travelStoryRoutes)
// app.use("/api/complaint", complaintRoutes)
// app.use("/api/grievance", grievanceRoutes)

// // Cloudinary Upload Route
// app.post("/api/upload", upload.single("image"), (req, res) => {
//   try {
//     res.json({
//       success: true,
//       imageUrl: req.file.path, // Cloudinary auto generates secure URL
//     })
//   } catch (error) {
//     console.error("Upload Error:", error)
//     res.status(500).json({ success: false, message: "Image upload failed" })
//   }
// })

// // Static Files
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// app.use("/uploads", express.static(path.join(__dirname, "uploads")))
// app.use("/assets", express.static(path.join(__dirname, "assets")))

// // Error Handling Middleware
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500
//   const message = err.message || "Internal Server Error"
//   return res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   })
// })

// // Start Server
// const PORT = process.env.PORT || 5000
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on port ${PORT}!`)
// })


import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Routes
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import travelStoryRoutes from "./routes/travelStory.route.js";
import complaintRoutes from "./routes/complaint.route.js";
import grievanceRoutes from "./routes/grievance.route.js";

dotenv.config();

const app = express();

// -------------------- MONGODB CONNECTION --------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Database is connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// -------------------- CLOUDINARY CONFIG --------------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// -------------------- MULTER + CLOUDINARY STORAGE --------------------
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "travel-diary-app",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});
const upload = multer({ storage });

// -------------------- CORS CONFIG --------------------
app.use(
  cors({
    origin: [
      "http://localhost:5173",           // local frontend
      "http://localhost:5174",           // alternate local frontend
      "https://travel-snap.onrender.com" // deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,                  // allow cookies/auth
    exposedHeaders: ['set-cookie'],     // allow frontend to read cookies
    sameSite: 'none',                   // allow cross-site cookies
    secure: true                        // only send cookies over HTTPS
  })
);

// -------------------- MIDDLEWARE --------------------
app.use(cookieParser());
app.use(express.json());

// -------------------- ROUTES --------------------
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/travel-story", travelStoryRoutes);
app.use("/api/complaint", complaintRoutes);
app.use("/api/grievance", grievanceRoutes);

// -------------------- CLOUDINARY UPLOAD ROUTE --------------------
app.post("/api/upload", upload.single("image"), (req, res) => {
  try {
    res.json({
      success: true,
      imageUrl: req.file.path,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ success: false, message: "Image upload failed" });
  }
});

// -------------------- STATIC FILES --------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

// -------------------- ERROR HANDLING --------------------
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}!`);
});
