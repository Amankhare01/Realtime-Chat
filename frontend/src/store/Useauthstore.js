import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js";

export const Useauthstore = create((set)=>({
    authUser: null,
    isSigningup: false,
    isLoginup: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async()=>{
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data});
        } catch (error) {
            console.log("Error in checkauth", error);
            set({authUser:null});
        }finally{
            set({isCheckingAuth:false})
        }
    }
}));