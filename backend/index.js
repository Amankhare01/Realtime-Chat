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
dotenv.config();

const app = express(); // ✅ single app instance
const server = http.createServer(app); // bind server here

// Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://realtime-chat-1-ykyv.onrender.com/",
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoute);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));

  app.get("*", (req,res)=>{
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  })
}

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
