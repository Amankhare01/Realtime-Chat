import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-toastify";

export const Useauthstore = create((set) => ({
  authUser: null,
  isSigningup: false,
  isLoginup: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers:[],


  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null }); // Properly set Zustand state to trigger re-render
      localStorage.removeItem("user"); // Remove stored user data
    } catch (error) {
      console.log("Logout error:", error);
    }
  },
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async () => {},

  login: async (data) => {
    set({ isLoginup: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Login Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoginup: false });
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data, {
        headers: { "Content-Type": "multipart/form-data" }, // Important
      });
  
      set({ authUser: res.data }); // Update Zustand state
      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  }
  
}));
