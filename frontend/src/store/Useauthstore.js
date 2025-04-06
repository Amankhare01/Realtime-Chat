import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-toastify";
import { persist, createJSONStorage } from "zustand/middleware";
import {io} from "socket.io-client";

const base_url = 'https://localhost:4000'
export const Useauthstore = create(
  persist(
    (set,get) => ({
      authUser: null,
      isSigningup: false,
      isLoginup: false,
      isUpdatingProfile: false,
      isCheckingAuth: true,
      onlineUsers: [],
      socket:[],

      setAuthUser: (user) => set({ authUser: user }),

      logout: async () => {
        try {
          await axiosInstance.post("/auth/logout");
      
          // Clear the Zustand store and remove persisted data
          set({
            authUser: null,
            isSigningup: false,
            isLoginup: false,
            isUpdatingProfile: false,
            isCheckingAuth: false,
            onlineUsers: [],
          });
      
          // Remove manually from localStorage
          localStorage.removeItem("auth-storage");
          get().disconnectSocket()
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

      login: async (data) => {
        set({ isLoginup: true });
        try {
          const res = await axiosInstance.post("/auth/login", data);
          set({ authUser: res.data });
          toast.success("Login Successfully");
          get().connectSocket()
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
            headers: { "Content-Type": "multipart/form-data" },
          });

          set({ authUser: res.data });
          toast.success("Profile Updated Successfully");
        } catch (error) {
          toast.error(error.response?.data?.message || "Update failed");
        } finally {
          set({ isUpdatingProfile: false });
        }
      },
      connectSocket:()=>{
        const {authUser}= get()
        if(!authUser || get().socket?.connected) return;

        const socket = io(base_url)
        socket.connect()
      },
      disconnectSocket:()=>{}
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage), // Ensuring JSON serialization
    }
  )
);
