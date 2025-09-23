import axiosInstance from "../utils/axiosInstance";

const adminService = {
  // Verify admin access with admin key
  verifyAdminKey: async (adminKey) => {
    try {
      const response = await axiosInstance.post("/auth/verify-admin", { adminKey });
      return response.data;
    } catch (error) {
      console.error("Error verifying admin key:", error);
      throw error;
    }
  },
  
  // Get all grievances for admin (unfiltered by user)
  getAllGrievances: async () => {
    try {
      const response = await axiosInstance.get("/grievance/admin/all");
      return response.data;
    } catch (error) {
      console.error("Error fetching all grievances:", error);
      throw error;
    }
  },

  // Approve or unapprove a grievance for main page display
  approveGrievance: async (id, isApproved) => {
    try {
      const response = await axiosInstance.put(`/grievance/admin/approve/${id}`, {
        isApproved
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating approval status for grievance with ID ${id}:`, error);
      throw error;
    }
  },
};

export default adminService;