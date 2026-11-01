import express from "express";
import { addBlog, deleteBlog, getBlog, likeUnlikeBlog, updateBlog } from "../controllers/blog-controller.js";
import checkUser from "../middlewares/authUser-middleare.js";

const blogRoute = express.Router()

blogRoute.post("/addblog",checkUser, addBlog)
blogRoute.put("/updateblog",checkUser, updateBlog)
blogRoute.post("/likeblog",checkUser, likeUnlikeBlog)
blogRoute.delete("/deleteblog",checkUser, deleteBlog)
blogRoute.get("/getblog",checkUser, getBlog)

export default blogRoute