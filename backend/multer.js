// import multer from "multer"
// import path from "path"
// import { v2 as cloudinary } from "cloudinary"
// import { CloudinaryStorage } from "multer-storage-cloudinary"
// import dotenv from "dotenv"

// dotenv.config()

// // Use Cloudinary configuration from index.js - no need to configure here

// // Cloudinary storage configuration
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "travel-diary-app",
//     resource_type: "auto",
//   }
// })

// // file filter to accept only images
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image/")) {
//     cb(null, true)
//   } else {
//     cb(new Error("Only images are allowed"), false)
//   }
// }

// // Initialize multer instance
// const upload = multer({ storage, fileFilter })

// export default upload
// export { cloudinary }


import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

// ✅ Configure Cloudinary with .env variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "travel-diary-app", // folder in your Cloudinary dashboard
    resource_type: "auto",      // allow all formats (image, video, etc.)
  },
});

// ✅ File filter to accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

// ✅ Multer instance
const upload = multer({ storage, fileFilter });

export default upload;
export { cloudinary };
