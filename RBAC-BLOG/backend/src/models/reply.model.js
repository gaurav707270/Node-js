import mongoose from "mongoose";


const replySchema = new mongoose.Schema({
    text: { type: String, required: true },
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: "blogs", required: true },
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: "comments", requred: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required :true},
    like:[{type:mongoose.Schema.Types.ObjectId, ref:"users"}]
},{
    timestamps:true
})


const reply = mongoose.model("replys", replySchema)

export default reply