import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("Database connected Successfully")
})
.catch(err=> console.log("There is an error while connecting databse", err));
app.post("/users", async (req, res) => {
    try {
        const user = new user(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
});