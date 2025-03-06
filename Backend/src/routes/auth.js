import express from 'express';
import { Login, Logout, Signup } from '../controller/auth.controller.js';

const router = express.Router();

// export const signup = async (req,res)={
//     const{fullname, email, password}=req,body;

//     try{
//         if password.length
//     }
// }

router.post('/login', Login)

router.post('/signup',Signup)

router.post('/Logout', Logout)
export default router;