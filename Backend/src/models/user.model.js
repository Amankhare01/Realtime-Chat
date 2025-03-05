import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    fullname:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlenth:6,
    },
    profilepic:{
        type:String,
        default:"",
    },
},
    {
        timestamps:true,
    }

); 

export default userSchema
