import cloudinary from '../lib/cloudinary.js';
import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import multer from "multer";
import fs from "fs";
import { promisify } from "util";
export const Signup = async(req,res)=>{
    const {fullName, email, password}=req.body;
    try{
        if(!fullName || !email || !password){
            return res.status(400).json({message: 'Please fill all required fields'})
        }
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
            password:hashedPassword
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
export const Login = async(req,res)=>{
    const {email, password}= req.body;
    try{
        const user = await User.findOne({email});

        if (!user){
            return res.status(404).json({message:"Invalid Credentials"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) { // Fixed condition
            return res.status(404).json({message:"Invalid Credentials"});
        }

        generateToken(user._id, res);

        res.status(201).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilepic:user.profilepic,
        });

    } catch(err) { // Fixed missing error argument
        console.log("Internal Server Error", err);
        res.status(500).json({message:"Internal Server error"});
    }
}
export const Logout = (req, res) => {
    try {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None", // or "Lax" depending on your frontend-backend setup
        secure: true,     // true if using HTTPS
      });
  
      return res.status(200).json({ message: "Logout Successfully" });
    } catch (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
// export const updateProfile = async (req, res) => {
//     try {
//       const { profilepic } = req.body;
//       const userId = req.user?._id; // Ensure `req.user` exists
  
//       if (!profilepic) {
//         return res.status(400).json({ message: "Profile Pic is required" });
//       }
  
//       if (!userId) {
//         return res.status(401).json({ message: "Unauthorized" });
//       }
  
//       // Upload Image to Cloudinary
//       const uploadResponse = await cloudinary.uploader.upload(profilepic, {
//         folder: "profile_pics",
//         transformation: [{ width: 300, height: 300, crop: "fill" }],
//       });
  
//       // Update User Profile Pic
//       const updatedUser = await User.findByIdAndUpdate(
//         userId,
//         { profilePic: uploadResponse.secure_url },
//         { new: true } // Return updated user
//       );
  
//       if (!updatedUser) {
//         return res.status(404).json({ message: "User not found" });
//       }
  
//       res.status(200).json(updatedUser);
//     } catch (error) {
//       console.error("Error while updating Profile Pic:", error);
//       res.status(500).json({ message: "Error while updating profile picture" });
//     }
//   };
  
  // Multer setup: Store file in memory

const storage = multer.memoryStorage();
export const upload = multer({ storage }).single("profilepic");

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user?._id; // Ensure `req.user` exists
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    if (!req.file) return res.status(400).json({ message: "Profile Pic is required" });

    // Upload image directly from memory buffer
    const uploadResponse = await cloudinary.uploader.upload_stream(
      { folder: "profile_pics", transformation: [{ width: 300, height: 300, crop: "fill" }] },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return res.status(500).json({ message: "Image upload failed" });
        }

        // Update user profile picture in DB
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { profilepic: result.secure_url },
          { new: true }
        );

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json(updatedUser);
      }
    );

    uploadResponse.end(req.file.buffer); // Send file to Cloudinary
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
};

export const checkAuth = (req,res)=>{
    try {
        res.status(200).json({message:"Valid User"})
    } catch (error) {
        console.log("Internal Error in checking auth", error.message);
        res.status(500).json({message:"Internal server error"});
    }
}