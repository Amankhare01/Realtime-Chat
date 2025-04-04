
import Message from "../middleware/message.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
export const getUsersforSidebar = async (req, res) => {
    try {
        console.log("Request User Object:", req.user); // Debug user object

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized - User not found" });
        }

        const loggedInUserId = req.user._id;
        console.log("Logged In User ID:", loggedInUserId); // Debug user ID

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersforSidebar", error.message);
        res.status(500).json({ message: "Error in getUsersforSidebar" });
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
        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error while sending message", error.message);
        res.status(500).json({ message: "Internal error while sending message" });
    }
};
