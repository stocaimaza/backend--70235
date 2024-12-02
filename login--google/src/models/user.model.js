import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String, 
    email: String,
    password: String,
    age: Number
})

const UserModel = mongoose.model("users", userSchema);

export default UserModel;