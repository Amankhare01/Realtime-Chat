import express from 'express';
import { checkAuth, googleAuth, Login, Logout, Signup, updateProfile, upload } from '../controller/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import User from '../models/user.model.js';
const router = express.Router();

router.post('/login', Login)

router.post('/signup',Signup)

router.post('/Logout', Logout)

router.put('/update-profile',protectRoute,upload, updateProfile)

router.get('/check',protectRoute, checkAuth)

router.get("/search", async (req, res) => {
    const { userId } = req.query;
  
    if (!userId || userId.length < 24) return res.json([]);
  
    try {
      const user = await User.findById(userId).select("fullName _id profilepic");
      if (!user) return res.json([]);
      return res.json([user]);
    } catch (err) {
      console.error("Search error:", err.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
router.post("/google-login", googleAuth);

export default router;