import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.js';
import messageRoute from './src/routes/message.route.js';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
app.use(express.json({ limit: "50mb" })); // Increase JSON payload limit
app.use(express.urlencoded({ limit: "50mb", extended: true })); // Increase URL-encoded form data limit
app.use(bodyParser.json({ limit: "50mb" })); // Increase body parser limit
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

const PORT = process.env.PORT || 3030;

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoute)
mongoose.connect(process.env.MONGO)
.then(() => console.log('Database connected sucessfully'))
.catch(err => console.error('MongoDB connection error:', err));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
