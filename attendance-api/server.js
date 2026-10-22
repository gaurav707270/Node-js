import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Faculty from "./models/Faculty.js";
import Attendance from "./models/Attendance.js";
import auth from "./middleware/auth.js";

dotenv.config();

const app = express();

app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

// Faculty Registration (for lab testing; restrict in production)
app.post("/api/faculty/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        if (typeof password !== "string" || password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const existingFaculty = await Faculty.findOne({ email: normalizedEmail });

        if (existingFaculty) {
            return res.status(409).json({
                success: false,
                message: "Faculty already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const faculty = await Faculty.create({
            name,
            email: normalizedEmail,
            password: hashedPassword
        });

        return res.status(201).json({
            success: true,
            message: "Faculty registered successfully.",
            data: {
                id: faculty._id,
                name: faculty.name,
                email: faculty.email
            }
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Faculty already exists."
            });
        }

        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
});

// Faculty Login API
app.post("/api/faculty/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }

        const faculty = await Faculty.findOne({
            email: email.trim().toLowerCase()
        }).select("+password");

        if (!faculty) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        const isPasswordValid = await bcrypt.compare(password, faculty.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        const token = jwt.sign(
            { facultyId: faculty._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            data: {
                id: faculty._id,
                name: faculty.name,
                email: faculty.email
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
});

// Mark Attendance API (Protected)
app.post("/api/attendance/mark", auth, async (req, res) => {
    try {
        const { status } = req.body;

        if (!["Present", "Absent"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Status must be Present or Absent."
            });
        }

        // Uses UTC date. Change consistently if attendance must use another timezone.
        const date = new Date().toISOString().slice(0, 10);

        const attendance = await Attendance.create({
            facultyId: req.facultyId,
            date,
            status
        });

        return res.status(201).json({
            success: true,
            message: "Attendance marked successfully.",
            data: attendance
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Attendance already marked for today."
            });
        }

        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
});

// Get Today's Attendance API (Protected)
app.get("/api/attendance/today", auth, async (req, res) => {
    try {
        const date = new Date().toISOString().slice(0, 10);

        const attendance = await Attendance.findOne({
            facultyId: req.facultyId,
            date
        }).populate("facultyId", "name email");

        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: "No attendance found for today."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Today's attendance fetched successfully.",
            data: attendance
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
});

// Date-Based Attendance API (Protected)
app.get("/api/attendance/date/:date", auth, async (req, res) => {
    try {
        const { date } = req.params;
        const parsedDate = new Date(`${date}T00:00:00.000Z`);

        if (!/^\d{4}-\d{2}-\d{2}$/.test(date) ||
            Number.isNaN(parsedDate.getTime()) ||
            parsedDate.toISOString().slice(0, 10) !== date) {
            return res.status(400).json({
                success: false,
                message: "A valid date in YYYY-MM-DD format is required."
            });
        }

        const attendance = await Attendance.findOne({
            facultyId: req.facultyId,
            date
        }).populate("facultyId", "name email");

        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: "No attendance found for this date."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Attendance fetched successfully.",
            data: attendance
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
