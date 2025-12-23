import { toast } from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance.js";

export const UseAuthStore = create((set) => ({
  isLoading: false,
  auth: null,
  isAuthenticated: false,
  hasCheckedAuth: false,

  signup: async (data) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      set({
        isAuthenticated: true,
        isLoading: false,
        auth: response.data,
      });
    } catch (error) {
      set({ isLoading: false, isAuthenticated: false });
      console.error(error);
      if (error.response) {
        const msg = error.response.data?.msg || "Login failed";
        toast.error(msg);
      }
    }
  },

  login: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({
        isAuthenticated: true,
        isLoading: false,
        auth: res.data.data ?? res.data,
      });
    } catch (error) {
      console.error(error);
      if (error.response) {
        const msg = error.response.data?.msg || "Login failed";
        toast.error(msg);
      }
      set({ isLoading: false, isAuthenticated: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("token");
      set({ isAuthenticated: false, auth: null, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
      toast.error("Something went wrong");
    }
  },

  profile: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/auth/profile");
      set({
        isLoading: false,
        auth: response.data.data,
        isAuthenticated: true,
        hasCheckedAuth: true,
      });
    } catch (error) {
      set({
        isLoading: false,
        isAuthenticated: false,
        auth: null,
        hasCheckedAuth: true,
      });
      console.log(error);
    }
  },

  deleteAccount: async () => {
    set({ isLoading: true });
    try {
      await axiosInstance.delete("/auth/delete");
      set({ isLoading: false, isAuthenticated: false, auth: null });
      toast.success("Account delete");
    } catch (error) {
      const msg =
        error.response?.data?.msg || error.message || "Something went wrong";
      toast.error(msg);
    }
  },
}));
