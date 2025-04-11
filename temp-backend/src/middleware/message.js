import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        senderId: {  // Changed "SenderId" to "senderId"
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiverId: {  // Changed "receiveId" to "receiverId"
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
        },
        image: {  // Changed "Image" to "image"
            type: String,
        },
    },
    { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
