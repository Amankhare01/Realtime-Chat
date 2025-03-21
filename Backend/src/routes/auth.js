import express from 'express';
import { checkAuth, Login, Logout, Signup, updateProfile } from '../controller/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();


router.post('/login', Login)

router.post('/signup',Signup)

router.post('/Logout', Logout)

router.put('/update-profile', protectRoute, updateProfile)

router.get('/check', checkAuth)
export default router;