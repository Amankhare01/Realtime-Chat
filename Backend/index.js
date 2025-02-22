import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import user from './routes/user.js';  // Import User model

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

mongoose.connect(process.env.MONGO)
.then(() => console.log('Database connected sucessfully'))
.catch(err => console.error('MongoDB connection error:', err));


app.post("/users", async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new user({ email, password });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
