import mongose from 'mongoose'

const UserSchema = new mongose.Schema({
    email:String,
    password:String,
})

module.exports = mongoose.model("user", UserSchema);