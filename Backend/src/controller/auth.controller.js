import { generateToken } from '../lib/utils';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';

export const Signup = async(req,res)=>{
    const {fullname, email, password}=req.body;
    try{
        if (password.length <6){
            return res.status(400).json({message: 'Password must contain atleast 6 characters'})
        }
        const user = await User.findOne({email});
        if(user) return res.status(400).json({message: "User already exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password:hashedpassword
        })

        if (newUser){
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilepic:newUser.profilepic,
            })
        }else{
            return res.status(400).json({message:"Invalid User Data"})
        }
    }
    catch(err){
        console.log("Internal Server Error",err),
        res.status(500).json({message:"Internal server error"});
    }
}
export const Login = (req,res)=>{
    res.send('Login Route');
}
export const Logout = (req,res)=>{
    res.send('Logout Route');
}