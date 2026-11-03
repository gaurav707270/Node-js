import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: "blogs", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
   like: [{
           type: mongoose.Schema.Types.ObjectId,
           ref: "users"
       }]
}, {
    timestamps: true
})

const comment = mongoose.model("comments", commentSchema)

export default comment