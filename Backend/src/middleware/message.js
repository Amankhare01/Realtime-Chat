import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
    {
        SenderId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        receiveId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },

        text:{
            type: String,
        },
        Image:{
            type:String
        },
    },
    {timestamps:true}
);


const  Message = mongoose.model('Message', messageSchema)

export default Message;