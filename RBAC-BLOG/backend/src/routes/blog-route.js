import express from "express";
import { addBlog, updateBlog } from "../controllers/blog-controller.js";
import checkUser from "../middlewares/authUser-middleare.js";

const blogRoute = express.Router()

blogRoute.post("/addblog",checkUser, addBlog)
blogRoute.put("/updateblog",checkUser, updateBlog)

export default blogRoute