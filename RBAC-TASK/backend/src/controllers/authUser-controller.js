import user from "../models/authUser-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signIn = async (req, res) => {
    try {
        const { role, userName, email, password } = req.body;

        if (!role || !email || !password || !userName) {
            return res.status(400).json({
                status: false,
                message: "all filed required"
            })
        }

        const userExists = await user.findOne({ email })

        if (userExists) {
            return res.status(401).json({
                status: false,
                message: "user allready exists"
            })
        }

        if (role == "superAdmin") {
            const superAdminExists = await user.findOne({ email })

            if (superAdminExists) {
                return res.status(401).json({
                    status: false,
                    message: 'superAdmin allready exists'
                })
            }
        }

        const hashPassword = await bcrypt.hash(password, 12)

        const result = await user.create({ ...req.body, password: hashPassword })

        return res.status(201).json({
            status: true,
            message: "user signUp successfully",
            data: await user.findOne({ email }).select("-password")
        })

    } catch (error) {
        console.log(error)

        return res.status(400).json({
            status: false,
            message: "yuser sign in failed",
            err: error.message
        })
    }
}


const singIn = async (req, res) => {
    try {

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "email password required"
            })
        }

        const findUser = await user.findOne({ email })

        const comparePassword = bcrypt.compare(password, findUser.password);

        if (!comparePassword) {
            return res.status(401).json({
                status: false,
                message: "password incorrect"
            })
        }

        const accessToken = jwt.sign({
            role: findUser.role,
            _id: findUser._id
        }, process.env.ACCESS_JWT_SECRET, {
            expiresIn: "1h"
        })

        const refreshToken = jwt.sign({
            role: findUser.role,
            _id: findUser._id
        }, process.env.REFRESH_JWT_SECRET, {
            expiresIn: "7d"
        })

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000 * 24 * 7
        })

        return res.status(200).json({
            status: true,
            message: "user singin successfully",
            data: await user.findOne({ email }).select("-password")
        })



    } catch (error) {
        console.log(error)

        return res.status(400).json({
            status: false,
            messages: "user singn in failed",
            err: error.message
        })
    }
}