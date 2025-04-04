import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";

export const Usechatstore = create((set, get) => ({
    messages: [],  // ✅ Use `messages` consistently
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,

    // Fetch Users for Chat Sidebar
    getUsers: async () => {
        set({ isUserLoading: true });
        try {
            console.log("Fetching Users...");
            const res = await axiosInstance.get("/messages/users");
            console.log("Response:", res.data);
            set({ users: res.data });
        } catch (error) {
            console.error("Axios Error:", error.response?.data || error.message);
            toast.error(error.response?.data.message || "An error occurred");
        } finally {
            set({ isUserLoading: false });
        }
    },

    // Send Message
    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        if (!selectedUser) {
            toast.error("No user selected.");
            return;
        }

        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data] });  // ✅ Fix state update
        } catch (error) {
            toast.error(error.response?.data.message || "Error sending message");
        }
    },

    // Get Messages for Selected User
    getMessages: async (userId) => {
        if (!userId) {
            console.warn("No user selected for fetching messages.");
            return;
        }

        set({ isMessageLoading: true });

        try {
            console.log(`Fetching messages for user ${userId}...`);
            const res = await axiosInstance.get(`/messages/${userId}`);
            console.log("Messages received:", res.data);

            set({ messages: res.data || [] }); // ✅ Ensure messages array is set properly
        } catch (error) {
            console.error("Error fetching messages:", error.response?.data || error.message);
            toast.error(error.response?.data.message || "Failed to load messages");
        } finally {
            set({ isMessageLoading: false });
        }
    },

    // Set Selected User
    setSelectedUser: (selectedUser) => {
        set({ selectedUser, messages: [] });  // ✅ Reset messages when switching users
    },
}));
