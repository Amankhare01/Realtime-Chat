
import User from "../models/user.model";

export const getUsersforSidebar=async(req,res)=>{
    try {
        const loggedInUserId=req.user._id;
        const filtredUsers = await User.find({_id:{$ne: loggedInUserId}}).select("-password");
        res.status(200).json(filtredUsers)
    } catch (error) {
        console.error("Error in getUsersforSidebar", error.message);
        res.status(500).json("Error in getUserforsidebar");
    }
}
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
export const sendMessage = async(req, res)=>{
    try {
        const {text, image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;


        let imageUrl;
        if (image){
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

        res.status(201).json(newMessage)
    } catch (error) {
        console.log("Error while sending message", error.message);
        res.status(500).json({message:"Internal error while sending message"});
    }
}