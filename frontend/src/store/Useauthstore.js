import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-toastify";
import { persist, createJSONStorage } from "zustand/middleware";
import { io } from "socket.io-client";
const baseURL = import.meta.env.MODE === "development" ? "http://localhost:4000" : "/"
export const Useauthstore = create(
  persist(
    (set, get) => ({
      authUser: null,
      isSigningup: false,
      isLoginup: false,
      isUpdatingProfile: false,
      isCheckingAuth: true,
      onlineUsers: [],
      socket: null,

      setAuthUser: (user) => set({ authUser: user }),

      logout: async () => {
        try {
          await axiosInstance.post("/auth/logout");

          set({
            authUser: null,
            isSigningup: false,
            isLoginup: false,
            isUpdatingProfile: false,
            isCheckingAuth: false,
            onlineUsers: [],
          });

          localStorage.removeItem("auth-storage");
          get().disconnectSocket();
        } catch (error) {
          console.log("Logout error:", error);
        }
      },

      checkAuth: async () => {
        try {
          const res = await fetch(`${baseURL}auth/check`, {
            credentials: "include",
          });
          
          if (!res.ok) throw new Error("Auth check failed");
          
          const result = await res.json();
          set({ authUser: result.user }); // Make sure this matches backend response
        } catch (err) {
          set({ authUser: null, err });
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

          setTimeout(() => {
            get().connectSocket();
          }, 100);
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
      getUsers: async () => {
        set({ isUserLoading: true });
        try {
          const res = await axiosInstance.get("/messages/chats");
          set({ users: res.data });
        } catch (err) {
          console.error("Sidebar fetch error", err);
          set({ users: [] });
        } finally {
          set({ isUserLoading: false });
        }
      },      

      connectSocket: () => {
        const { authUser } = get();
        const existingSocket = get().socket;

        if (!authUser || existingSocket?.connected) return;

        const socket = io(baseURL, {
          withCredentials: true,
          query: {
            userId: authUser._id,
          },
        });

        socket.on("getOnlineUsers", (userIds) => {
          set({ onlineUsers: userIds });
        });

        set({ socket });
      },

      disconnectSocket: () => {
        const socket = get().socket;
        if (socket && socket.connected) {
          socket.disconnect();
          set({ socket: null });
          console.log("Socket disconnected manually");
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        authUser: state.authUser,
        isSigningup: state.isSigningup,
        isLoginup: state.isLoginup,
        isUpdatingProfile: state.isUpdatingProfile,
        isCheckingAuth: state.isCheckingAuth,
        onlineUsers: state.onlineUsers,
        // socket is intentionally excluded
      }),
    }
  )
);
