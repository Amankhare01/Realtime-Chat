import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.js';
import Message from './src/middleware/message.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3030;

app.use("/api/auth", authRoutes)
app.use("/api/message", Message)
mongoose.connect(process.env.MONGO)
.then(() => console.log('Database connected sucessfully'))
.catch(err => console.error('MongoDB connection error:', err));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
