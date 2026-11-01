import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    autherId:{type:mongoose.Schema.Types.ObjectId, ref:"users",required:true},
    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }]
},{
    timestamps:true
})

const blog = mongoose.model("blogs",blogSchema)

export default blog