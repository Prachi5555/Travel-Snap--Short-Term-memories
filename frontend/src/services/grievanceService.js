// import axiosInstance from "../utils/axiosInstance";

// const grievanceService = {
//   // Get all grievances
//   getAllGrievances: async () => {
//     try {
//       const response = await axiosInstance.get("/grievance/all");
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching grievances:", error);
//       throw error;
//     }
//   },

//   // Get grievance by ID
//   getGrievanceById: async (id) => {
//     try {
//       const response = await axiosInstance.get(`/grievance/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching grievance with ID ${id}:`, error);
//       throw error;
//     }
//   },

//   // Add new grievance
//   addGrievance: async (grievanceData) => {
//     try {
//       const response = await axiosInstance.post("/grievance/add", grievanceData);
//       return response.data;
//     } catch (error) {
//       console.error("Error adding grievance:", error);
//       throw error;
//     }
//   },

//   // Update grievance
//   updateGrievance: async (id, grievanceData) => {
//     try {
//       const response = await axiosInstance.put(
//         `/grievance/update/${id}`,
//         grievanceData
//       );
//       return response.data;
//     } catch (error) {
//       console.error(`Error updating grievance with ID ${id}:`, error);
//       throw error;
//     }
//   },

//   // Delete grievance
//   deleteGrievance: async (id) => {
//     try {
//       const response = await axiosInstance.delete(`/grievance/delete/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error deleting grievance with ID ${id}:`, error);
//       throw error;
//     }
//   },

//   // Search grievances
//   searchGrievances: async (query) => {
//     try {
//       const response = await axiosInstance.get(`/grievance/search?query=${query}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error searching grievances with query ${query}:`, error);
//       throw error;
//     }
//   },

//   // Filter grievances by status
//   filterByStatus: async (status) => {
//     try {
//       const response = await axiosInstance.get(
//         `/grievance/filter-by-status?status=${status}`
//       );
//       return response.data;
//     } catch (error) {
//       console.error(`Error filtering grievances by status ${status}:`, error);
//       throw error;
//     }
//   },

//   // Filter grievances by date range
//   filterByDateRange: async (fromDate, toDate) => {
//     try {
//       const response = await axiosInstance.get(
//         `/grievance/filter-by-date?fromDate=${fromDate}&toDate=${toDate}`
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error filtering grievances by date range:", error);
//       throw error;
//     }
//   },
  
//   // Get approved grievances (public endpoint - no authentication required)
//   getApprovedGrievances: async () => {
//     try {
//       const response = await axiosInstance.get("/grievance/public/approved");
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching approved grievances:", error);
//       // Return empty array instead of throwing error to prevent UI crashes
//       return [];
//     }
//   },

//   // Upload image
//   uploadImage: async (imageFile) => {
//     try {
//       const formData = new FormData();
//       formData.append("image", imageFile);

//       const response = await axiosInstance.post(
//         "/grievance/upload-image",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       throw error;
//     }
//   },

//   // Delete image
//   deleteImage: async (imageUrl) => {
//     try {
//       const response = await axiosInstance.delete(
//         `/grievance/delete-image?imageUrl=${encodeURIComponent(imageUrl)}`
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error deleting image:", error);
//       throw error;
//     }
//   },
// };

// export default grievanceService;



import axiosInstance from "../utils/axiosInstance";

const grievanceService = {
  // Get all grievances (for logged-in user)
  getAllGrievances: async () => {
    try {
      const response = await axiosInstance.get("/grievance/all");
      return response.data;
    } catch (error) {
      console.error("Error fetching grievances:", error);
      throw error;
    }
  },

  // Get grievance by ID
  getGrievanceById: async (id) => {
    try {
      // ✅ fixed route to match backend
      const response = await axiosInstance.get(`/grievance/get/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching grievance with ID ${id}:`, error);
      throw error;
    }
  },

  // Add new grievance
  addGrievance: async (grievanceData) => {
    try {
      const response = await axiosInstance.post("/grievance/add", grievanceData);
      return response.data;
    } catch (error) {
      console.error("Error adding grievance:", error);
      throw error;
    }
  },

  // Update grievance
  updateGrievance: async (id, grievanceData) => {
    try {
      const response = await axiosInstance.put(
        `/grievance/update/${id}`,
        grievanceData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating grievance with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete grievance
  deleteGrievance: async (id) => {
    try {
      const response = await axiosInstance.delete(`/grievance/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting grievance with ID ${id}:`, error);
      throw error;
    }
  },

  // Search grievances
  searchGrievances: async (query) => {
    try {
      const response = await axiosInstance.get(`/grievance/search?query=${query}`);
      return response.data;
    } catch (error) {
      console.error(`Error searching grievances with query ${query}:`, error);
      throw error;
    }
  },

  // Filter grievances by status
  filterByStatus: async (status) => {
    try {
      const response = await axiosInstance.get(
        `/grievance/filter-by-status?status=${status}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error filtering grievances by status ${status}:`, error);
      throw error;
    }
  },

  // Filter grievances by date range (backend must implement this)
  filterByDateRange: async (fromDate, toDate) => {
    try {
      const response = await axiosInstance.get(
        `/grievance/filter-by-date?fromDate=${fromDate}&toDate=${toDate}`
      );
      return response.data;
    } catch (error) {
      console.error("Error filtering grievances by date range:", error);
      throw error;
    }
  },
  
  // Get approved grievances (public endpoint - no authentication required)
  getApprovedGrievances: async () => {
    try {
      const response = await axiosInstance.get("/grievance/public/approved");
      return response.data; // returns { grievances: [...] }
    } catch (error) {
      console.error("Error fetching approved grievances:", error);
      // ✅ keep response shape consistent
      return { grievances: [] };
    }
  },

  // Upload image
  uploadImage: async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await axiosInstance.post(
        "/grievance/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  },

  // Delete image
  deleteImage: async (filename) => {
    try {
      // ✅ fixed to send body (not query param)
      const response = await axiosInstance.delete(
        "/grievance/delete-image",
        { data: { filename } }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting image:", error);
      throw error;
    }
  },
};

export default grievanceService;
