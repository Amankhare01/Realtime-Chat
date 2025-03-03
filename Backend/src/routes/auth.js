import express from 'express';

const router = express.Router();

router.post('/login',(req,res)=>{
    res.send('Login Route');
})

router.post('/signup',(req,res)=>{
    res.send('Signing Route');
})

router.post('/Logout',(req,res)=>{
    res.send('Logout Route');
})
export default router;