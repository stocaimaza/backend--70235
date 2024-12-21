import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String, 
    role: String, 
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Orders"
        }
    ]
})

const UserModel = mongoose.model("users", userSchema); 

export default UserModel; 