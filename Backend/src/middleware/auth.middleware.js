import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next)=>{
    try{
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({message:"Unauthorized - No Token Provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({message:"Unauthorized - Invalid Token"})
        }

        const user = await User.findById(userId).select("-password");

        if(!user){
            return res.status(404).json({message:"Sala ye to user hi nhi hai"})
        }
        req.user = user;
    }catch{
        console.log("Internal error from protected route")
        res.status(500).json({message:"Protected route error"})
    }
}