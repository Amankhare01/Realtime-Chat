import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const user = mongoose.model("user", UserSchema);
export default user;
