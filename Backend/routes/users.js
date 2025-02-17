const express = require('express');
const zod = require('zod');
const {User} = require('../db.js')
const router = express.Router();

const registerschema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstname: zod.string(),
    password: zod.string(),
})
router.post('/register',async(req, res)=>{
    const body = require.body;
    const {success} = registerschema.safeParse(req.body);
    if(!success){
        return res.json({
            message: 'Invalid input/email already exists',
        })
    }
    const user = User.findOne({
        username:body.username
    })
    if(user._id){
        return res.json({
            message: 'User already exists',
        })
    }
    const dbuser = await user.created(body);
    const token = jwt.sign({
        userID: dbuser._id
    },JWT_secret);

    res.json({
        message: 'User created',
        token: token
    })
})