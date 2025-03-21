import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
    {
        SenderID:{
            type: mongoose.Schema.Types.Schema,
            ref:"User",
            required:true,
        },
        receiveId:{
            type: mongoose.Schema.Types.Schema,
            ref:"User",
            required:true,
        },

        text:{
            type: String,
        },
        Images:{
            type:String
        },
    },
    {timestamps:true}
);


const  Message = mongoose.model('Message', messageSchema)

export default Message;