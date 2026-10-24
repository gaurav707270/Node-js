import mongoose from "mongoose";

const authUser = new mongoose.Schema({
    role:{type:String, required:true},
    userName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:"string", required:true}
},{
    timestamps:true
})

const user = mongoose.model("users", authUser)

export default user