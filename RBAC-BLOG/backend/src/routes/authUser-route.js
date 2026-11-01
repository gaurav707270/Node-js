import express from "express";
import { getUser, signIn, signOut, signUp } from "../controllers/authUser-controller.js";

const authRoute = express.Router()

authRoute.post("/signup",signUp)
authRoute.post("/signin",signIn)
authRoute.post("/signout",signOut)
authRoute.get("/getuser",getUser)

export default authRoute