import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import { getMessage, getUsersforSidebar, sendMessage } from '../controller/message.controller.js';

const router = express.Router();

router.get("/users",protectRoute, getUsersforSidebar);
router.get("/:id", protectRoute, getMessage)
router.post("/send/:id", protectRoute, sendMessage)

export default router;