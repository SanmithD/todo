import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";

export const UseEmployeeStore = create((set, get) => ({
  isLoading: false,
  allDetails: null,
  detail: null,

  createEmployee: async (data) => {
    set({ isLoading: true });
    try {
      await axiosInstance.post("/employee/create", data);
      set({ isLoading: false });
      toast.success("Employee created successfully!");
      await get().getAllDetails();
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      console.log(error);
      const errorMessage = error.response?.data?.msg || error.message || "Failed to create employee";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  getAllDetails: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/employee/getAll");
      set({ allDetails: response.data.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.log(error);
      const errorMessage = error.response?.data?.msg || error.message || "Failed to fetch employees";
      toast.error(errorMessage);
    }
  },

  getDetailById: async (id) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/employee/get/${id}`);
      set({ detail: response.data.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.log(error);
      const errorMessage = error.response?.data?.msg || error.message || "Failed to fetch employee details";
      toast.error(errorMessage);
    }
  },

  deleteDetail: async (id) => {
    set({ isLoading: true });
    try {
      await axiosInstance.delete(`/employee/delete/${id}`);
      set({ isLoading: false });
      toast.success("Employee deleted successfully!");
      
      const currentDetails = get().allDetails;
      if (currentDetails) {
        const updatedDetails = currentDetails.filter(emp => emp._id !== id);
        set({ allDetails: updatedDetails });
      }
      
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      console.log(error);
      const errorMessage = error.response?.data?.msg || error.message || "Failed to delete employee";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  updateDetail: async (data, id) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.put(`/employee/update/${id}`, data);
      set({ isLoading: false });
      toast.success("Employee updated successfully!");
      
      set({ detail: response.data.data || data });
      
      const currentDetails = get().allDetails;
      if (currentDetails) {
        const updatedDetails = currentDetails.map(emp => 
          emp._id === id ? { ...emp, ...data } : emp
        );
        set({ allDetails: updatedDetails });
      }
      
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      console.log(error);
      const errorMessage = error.response?.data?.msg || error.message || "Failed to update employee";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  clearDetail: () => set({ detail: null }),
}));