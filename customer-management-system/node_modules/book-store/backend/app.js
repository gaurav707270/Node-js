import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth-route.js";
import bookRoute from "./routes/book-route.js";
import cartRoute from "./routes/cart-route.js";
import orderRoute from "./routes/order-route.js";

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "book store API is running"
    });
});

app.use("/api/auth", authRoute);
app.use("/api/books", bookRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "route not found"
    });
});

export default app;
