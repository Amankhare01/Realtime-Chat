import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {

        const token = req.cookies.jwt; // Getting JWT from cookie

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }

        // Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || !decoded.id) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }

        // Fetch user from DB
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user; // Attach user to request
        next();
    } catch (error) {
        console.error("Internal error from protected route:", error);
        res.status(500).json({ message: "Protected route error" });
    }
};
