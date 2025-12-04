// src/store/Useauthstore.js
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-toastify";
import { persist, createJSONStorage } from "zustand/middleware";
import { io } from "socket.io-client";

const baseURL = import.meta.env.MODE === "development" ? "http://localhost:4000" : "/";

// We declare the variable first so we can reference it inside onRehydrateStorage
let Useauthstore;

Useauthstore = create(
  persist(
    (set, get) => ({
      // state
      authUser: null,
      isSigningup: false,
      isLoginup: false,
      isUpdatingProfile: false,
      isCheckingAuth: true,
      onlineUsers: [],
      socket: null,

      // setters
      setAuthUser: (user) => set({ authUser: user }),

      // logout
      logout: async () => {
        try {
          await axiosInstance.post("/auth/logout");
        } catch (err) {
          // don't block logout if server call fails — still clear client state
          console.warn("Logout request failed:", err?.response?.data || err);
        } finally {
          set({
            authUser: null,
            isSigningup: false,
            isLoginup: false,
            isUpdatingProfile: false,
            isCheckingAuth: false,
            onlineUsers: [],
          });

          // clear persisted store entry and disconnect socket
          try {
            // persist middleware handles storage clearing on set, but force remove to be safe
            localStorage.removeItem("auth-storage");
          } catch (e) {
            /* ignore */
          }
          get().disconnectSocket();
        }
      },

      // check auth (recommended to call on app entry)
      checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
          // use axiosInstance so withCredentials and baseURL from axios config are used
          const res = await axiosInstance.get("/auth/check", { withCredentials: true });
          // backend may return { user: {...} } or user object directly; handle both
          const user = res.data?.user ?? res.data;
          set({ authUser: user });
        } catch (err) {
          // not authenticated or request failed
          set({ authUser: null });
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      // login
      login: async (data) => {
        set({ isLoginup: true });
        try {
          const res = await axiosInstance.post("/auth/login", data, { withCredentials: true });
          const user = res.data?.user ?? res.data;
          set({ authUser: user });

          toast.success("Login successful");

          // connect socket shortly after login
          setTimeout(() => {
            try {
              get().connectSocket();
            } catch (e) {
              console.warn("connectSocket failed after login", e);
            }
          }, 50);
        } catch (error) {
          const message = error?.response?.data?.message || error?.message || "Login failed";
          toast.error(message);
        } finally {
          set({ isLoginup: false });
        }
      },

      // update profile
      updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
          const res = await axiosInstance.put("/auth/update-profile", data, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          });
          const user = res.data?.user ?? res.data;
          set({ authUser: user });
          toast.success("Profile updated successfully");
        } catch (error) {
          const message = error?.response?.data?.message || error?.message || "Update failed";
          toast.error(message);
        } finally {
          set({ isUpdatingProfile: false });
        }
      },

      // fetch chats/users (sidebar)
      getUsers: async () => {
        set({ isUserLoading: true });
        try {
          const res = await axiosInstance.get("/messages/chats", { withCredentials: true });
          set({ users: res.data });
        } catch (err) {
          console.error("Sidebar fetch error", err);
          set({ users: [] });
        } finally {
          set({ isUserLoading: false });
        }
      },

      // socket handling
      connectSocket: () => {
        const { authUser } = get();
        const existingSocket = get().socket;

        if (!authUser) return;
        if (existingSocket?.connected) return;

        // create socket with same base URL as backend; ensure server accepts credentials
        const socket = io(baseURL, {
          withCredentials: true,
          // depending on your server, you might prefer to put userId in auth instead of query
          // auth: { userId: authUser._id },
          query: {
            userId: authUser._id,
          },
        });

        socket.on("connect", () => {
          console.log("Socket connected:", socket.id);
        });

        socket.on("disconnect", (reason) => {
          console.log("Socket disconnected:", reason);
        });

        socket.on("getOnlineUsers", (userIds) => {
          set({ onlineUsers: userIds });
        });

        // other socket listeners can be registered here if needed

        set({ socket });
      },

      disconnectSocket: () => {
        const socket = get().socket;
        if (socket && socket.connected) {
          socket.disconnect();
        }
        set({ socket: null });
        console.log("Socket disconnected manually");
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      // Persist only the minimal state — socket excluded intentionally
      partialize: (state) => ({
        authUser: state.authUser,
        isSigningup: state.isSigningup,
        isLoginup: state.isLoginup,
        isUpdatingProfile: state.isUpdatingProfile,
        isCheckingAuth: state.isCheckingAuth,
        onlineUsers: state.onlineUsers,
      }),

      /**
       * onRehydrateStorage is called after the store is rehydrated from storage.
       * We use it to re-establish the socket connection if a user was restored.
       */
      onRehydrateStorage: () => (state) => {
        // state is the restored slice from storage
        try {
          if (state && state.authUser) {
            // Delay slightly to ensure store is ready and components mounted
            setTimeout(() => {
              try {
                // Use the store reference to call connectSocket
                Useauthstore.getState().connectSocket();
              } catch (e) {
                console.warn("Failed to connect socket after rehydrate", e);
              }
            }, 50);
          }
        } catch (e) {
          // ignore rehydrate errors
          console.warn("onRehydrateStorage error", e);
        }
      },
    }
  )
);

// Export the named store (keeps compatibility with existing imports)
export { Useauthstore };
