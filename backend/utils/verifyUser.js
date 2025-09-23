// import jwt from "jsonwebtoken"
// import { errorHandler } from "./error.js"

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token

//   if (!token) {
//     return next(errorHandler(401, "Unauthorized"))
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return next(errorHandler(401, "Unauthorized"))
//     }

//     req.user = user

//     next()
//   })
// }


import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  // Check for token in cookies first (standard approach)
  const cookieToken = req.cookies.access_token;
  
  // If no cookie token, check for Authorization header (fallback)
  const authHeader = req.headers.authorization;
  const headerToken = authHeader && authHeader.startsWith('Bearer ') 
    ? authHeader.split(' ')[1] 
    : null;
    
  // Use either cookie token or header token
  const token = cookieToken || headerToken;

  if (!token) {
    return next(errorHandler(401, "Unauthorized - No valid token found"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized - Invalid token"));
    }

    req.user = user;
    next();
  });
};
