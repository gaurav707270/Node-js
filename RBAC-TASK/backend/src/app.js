import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config()

connectDB()

const app = express()

app.use(cookieParser())

app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173/",
    credentials: true
}))





export default app