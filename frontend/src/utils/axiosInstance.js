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
  withCredentials: true, // essential for sending cookies cross-domain
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to handle token from localStorage as fallback
axiosInstance.interceptors.request.use(
  (config) => {
    // Try to get token from localStorage as fallback if cookies fail
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
