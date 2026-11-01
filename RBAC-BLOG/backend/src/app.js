import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoute from "./routes/authUser-route.js";
import blogRoute from "./routes/blog-route.js";

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.use(cookieParser())

app.use(cors({
    credentials:true,
    origin:"http://localhost:5173/"
}))

app.use("/api",authRoute)
app.use("/api",blogRoute)




export default app