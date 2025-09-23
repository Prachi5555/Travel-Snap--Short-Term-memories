// import axios from "axios"

// const BASE_URL = "http://localhost:5000/api"

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// })

// export default axiosInstance



import axios from "axios";

// Deployed backend URL
const BASE_URL = "https://travelsnapbackend.onrender.com/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // keep this if your backend uses cookies/auth
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
