import express from "express";
import {  signUP, singIn } from "../controllers/authUser-controller.js";


const authRoute = express.Router()

authRoute.post("/signup",signUP)
authRoute.post("/signin",singIn)

export default authRoute