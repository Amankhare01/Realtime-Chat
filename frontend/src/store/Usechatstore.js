import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";


export const Usechatstore = create((set,get)=>({
    message:[],
    users:[],
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,



    getUsers: async () => {
        set({ isUserLoading: true });
        try {
            console.log(" Fetching Users...");
            const res = await axiosInstance.get("/messages/users");
            console.log("Response:", res.data);
            set({ users: res.data });
        } catch (error) {
            console.error("Axios Error:", error.response ? error.response.data : error.message);
            toast.error(error.response ? error.response.data.message : "An error occurred");
        } finally {
            set({ isUserLoading: false });
        }
    },
    sendMessage: async(messageData)=>{
        const {selectedUser, message}=get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({message: [...message, res.data]});
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    getMessages: async(userId)=>{
        set({isMessageLoading:true});
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages: res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isMessageLoading:false})
        }
    },
    
    setSelectedUser: (selectedUser)=> set({selectedUser}),
}))