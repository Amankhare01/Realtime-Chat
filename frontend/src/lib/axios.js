import axios from './axios'
// utils/axios.js
export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development"
      ? "http://localhost:4000/api"
      : "https://your-backend-url.onrender.com/api", // 👈 FIX THIS
    withCredentials: true,
  });
  