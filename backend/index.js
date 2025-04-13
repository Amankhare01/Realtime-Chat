// index.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.js';
import messageRoute from './src/routes/message.route.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { setupSocket } from './src/lib/socket.js'; // updated import
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

const app = express(); // ✅ single app instance
const server = http.createServer(app); // bind server here
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// const allowedOrigins = [
//   "http://localhost:5173" ,
//   "https://realtimechatss.netlify.app"
// ];

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoute);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// app.get("*", (req,res)=>{
//   res.sendFile(path.join(__dirname, "https://realtimechatss.netlify.app"));
// })

console.log("Serving frontend from: ", path.join(__dirname, "../frontend/dist"));

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Setup socket after server and app are ready
setupSocket(app, server);

const PORT = process.env.PORT || 3030;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
