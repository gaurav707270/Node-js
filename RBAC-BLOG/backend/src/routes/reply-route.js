import express from "express";
import checkUser from "../middlewares/authUser-middleare.js";
import { addReply, deleteReply, likeUnlikeReply, ownReply } from "../controllers/reply-controller.js";


const replyRoute = express.Router()


replyRoute.post("/addreply",checkUser,addReply)
replyRoute.delete("/deletereply",checkUser,deleteReply)
replyRoute.get("/ownreply",checkUser,ownReply)
replyRoute.post("/likereply",checkUser,likeUnlikeReply)

export default replyRoute