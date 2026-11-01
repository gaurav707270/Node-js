import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    role: { type: String, requred: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
},{
    timestamps:true
})


const authUser = mongoose.model("users", userSchema)

export default authUser