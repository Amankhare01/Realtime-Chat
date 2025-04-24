
import Message from "../middleware/message.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
export const getUsersforSidebar = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized - User not found" });
      }
  
      const myId = req.user._id;
  
      // Get messages involving the user
      const messages = await Message.find({
        $or: [
          { senderId: myId },
          { receiverId: myId }
        ]
      });
  
      const userIds = new Set();
  
      messages.forEach(msg => {
        if (msg.senderId.toString() !== myId.toString()) {
          userIds.add(msg.senderId.toString());
        }
        if (msg.receiverId.toString() !== myId.toString()) {
          userIds.add(msg.receiverId.toString());
        }
      });
  
      const chatUsers = await User.find({ _id: { $in: [...userIds] } }).select("-password");
  
      res.status(200).json(chatUsers);
    } catch (error) {
      console.error("Error in getUsersforSidebar:", error.message);
      res.status(500).json({ message: "Server error while loading chat users" });
    }
  };


export const getMessage = async(req, res)=>{
    try {
        const {id:userTochatId}= req.params;
        const myId = req.user._id;  

        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId:userTochatId},
                {senderId: userTochatId, receiverId:myId},
            ],
        });

        res.status(200).json(messages)
    } catch (error) {
        console.error("Error in getUsersforSidebar", error.message);
        res.status(500).json("Error in getUserforsidebar");
    }
}
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user?._id; // Ensure req.user exists

        if (!senderId || !receiverId) {
            return res.status(400).json({ message: "Sender or Receiver ID is missing" });
        }

        let imageUrl = "";
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();
        const ReceiverSocketId = getReceiverSocketId(receiverId);   
        if(ReceiverSocketId){
            io.to(ReceiverSocketId).emit("newMessage", newMessage);
        }
        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error while sending message", error.message);
        res.status(500).json({ message: "Internal error while sending message" });
    }
};
