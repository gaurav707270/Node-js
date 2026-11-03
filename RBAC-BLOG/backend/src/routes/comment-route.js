import express from "express";
import { addComment, deleteComment, likeUnlikeComment, ownComment } from "../controllers/comment-controller.js";
import checkUser from "../middlewares/authUser-middleare.js";

const commentRoute = express.Router()

commentRoute.post("/addcomment",checkUser,addComment)
commentRoute.delete("/deletecomment",checkUser,deleteComment)
commentRoute.post("/likecomment",checkUser,likeUnlikeComment)
commentRoute.get("/owncomment",checkUser,ownComment)

export default commentRoute