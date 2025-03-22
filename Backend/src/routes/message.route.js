import express from 'express'
import { protectRoute } from '../middleware/auth.middleware';
import { getMessage, getUsersforSidebar } from '../controller/message.controller';


const router = express.Router();

router.get("/users",protectRoute, getUsersforSidebar);
router.get("/:id", protectRoute, getMessage)
router.post("/send/:id", protectRoute, sendMessage)

export default router;  