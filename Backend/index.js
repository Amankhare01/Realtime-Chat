import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.js';
import messageRoute from './src/routes/message.route.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3030;

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoute)
mongoose.connect(process.env.MONGO)
.then(() => console.log('Database connected sucessfully'))
.catch(err => console.error('MongoDB connection error:', err));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
