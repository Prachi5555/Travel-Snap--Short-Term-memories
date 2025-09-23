// import bcryptjs from "bcryptjs"
// import User from "../models/user.model.js"
// import { errorHandler } from "../utils/error.js"
// import jwt from "jsonwebtoken"

// export const signup = async (req, res, next) => {
//   const { username, email, password } = req.body

//   if (
//     !username ||
//     !email ||
//     !password ||
//     username === "" ||
//     email === "" ||
//     password === ""
//   ) {
//     return next(errorHandler(400, "All fields are required"))
//   }

//   // check if the user already exists
//   const existingUser = await User.findOne({ email })

//   if (existingUser) {
//     return next(errorHandler(409, "User already exist with this email!"))
//   }

//   const hashedPassword = bcryptjs.hashSync(password, 10)

//   const newUser = new User({
//     username,
//     email,
//     password: hashedPassword,
//   })

//   try {
//     await newUser.save()

//     res.json("Signup successful")
//   } catch (error) {
//     next(error)
//   }
// }

// export const signin = async (req, res, next) => {
//   const { email, password } = req.body

//   if (!email || !password || email === "" || password === "") {
//     return next(errorHandler(400, "All fields are required"))
//   }

//   try {
//     const validUser = await User.findOne({ email })

//     if (!validUser) {
//       return next(errorHandler(404, "User not found"))
//     }

//     const validPassword = bcryptjs.compareSync(password, validUser.password)

//     if (!validPassword) {
//       return next(errorHandler(400, "Wrong Credentials"))
//     }

//     const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)

//     const { password: pass, ...rest } = validUser._doc

//     res
//       .status(200)
//       .cookie("access_token", token, {
//         httpOnly: true,
//       })
//       .json(rest)
//   } catch (error) {
//     next(error)
//   }
// }
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// ----------------- SIGNUP -----------------
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // validation
  if (!username || !email || !password || username.trim() === "" || email.trim() === "" || password.trim() === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    // check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(409, "User already exists with this email!"));
    }

    // hash password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    next(error);
  }
};

// ----------------- VERIFY ADMIN KEY -----------------
export const verifyAdmin = async (req, res, next) => {
  const { adminKey } = req.body;
  
  if (!adminKey) {
    return next(errorHandler(400, "Admin key is required"));
  }
  
  try {
    // Check if admin key matches the environment variable
    if (adminKey === process.env.ADMIN_KEY) {
      return res.status(200).json({ success: true, message: "Admin key verified successfully" });
    } else {
      return next(errorHandler(403, "Invalid admin key"));
    }
  } catch (error) {
    next(error);
  }
};

// ----------------- SIGNIN -----------------
export const signin = async (req, res, next) => {
  const { email, password, adminKey } = req.body;

  // validation
  if (!email || !password || email.trim() === "" || password.trim() === "") {
    return next(errorHandler(400, "All fields are required"));
  }
  
  // Check if admin key is provided but not valid
  if (adminKey && adminKey !== process.env.ADMIN_KEY) {
    return next(errorHandler(403, "Invalid admin key"));
  }

  try {
    // check user
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    
    // Check for admin key if provided
    if (adminKey && adminKey === process.env.ADMIN_KEY) {
      // If admin key is valid, set user as admin
      if (!validUser.isAdmin) {
        await User.findByIdAndUpdate(validUser._id, { isAdmin: true });
        validUser.isAdmin = true;
      }
    }

    // check password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Wrong credentials"));
    }

    // create JWT token
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin }, // include isAdmin for role-based access
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // remove password before sending
    const { password: pass, ...rest } = validUser._doc;

    // send cookie + user data
    return res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // secure cookie in prod
        sameSite: "strict",
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
