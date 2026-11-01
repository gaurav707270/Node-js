import express from "express";
import { getUser, refreshAccessToken, signIn, signOut, signUp } from "../controllers/authUser-controller.js";
import {  refreshTokenMiddleware } from "../middlewares/refreshToken-middleware.js";

const authRoute = express.Router()

authRoute.post("/signup",signUp)
authRoute.post("/signin",signIn)
authRoute.post("/refreshtoken",refreshTokenMiddleware,refreshAccessToken)
authRoute.post("/signout",signOut)
authRoute.get("/getuser",getUser)

export default authRoute