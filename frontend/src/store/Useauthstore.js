import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-toastify";

export const Useauthstore = create((set) => ({
  authUser: null,
  isSigningup: false,
  isLoginup: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

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
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      console.log("Success")
      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
      console.log("failed")
    } finally {
      set({ isUpdatingProfile: false });
    }
  }
}));
