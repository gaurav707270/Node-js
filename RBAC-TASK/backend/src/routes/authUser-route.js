import express from "express";
import {  signOut, signUP, singIn } from "../controllers/authUser-controller.js";


const authRoute = express.Router()

authRoute.post("/signup",signUP)
authRoute.post("/signin",singIn)
authRoute.post("/signout",signOut)

export default authRoute