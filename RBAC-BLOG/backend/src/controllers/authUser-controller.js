import authUser from "../models/authUser-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const signUp = async (req, res) => {
    try {
        const { role, userName, email, password } = req.body

        if (!role || !userName || !email || !password) {
            return res.status(400).json({
                status: false,
                message: "all failed required"
            })
        }

        const userExists = await authUser.findOne({ email })

        if (userExists) {
            return res.status(401).json({
                status: false,
                message: "user alredy exists"
            })
        }

        if (role == "admin") {
            const adminExists = await authUser.findOne({ role: "admin" })

            if (adminExists) {
                return res.status(401).json({
                    status: false,
                    message: "admin already exists"
                })
            }
        }

        const hashPassword = await bcrypt.hash(password, 12)

        const result = await authUser.create({ ...req.body, password: hashPassword })

        return res.status(201).json({
            status: true,
            message: "user signUp successfully ",
            data: await authUser.findOne({ email }).select("-password")
        })

    } catch (error) {
        console.log(error)

        return res.status(400).json({
            status: false,
            message: "user sign up failed",
            err: error.message
        })
    }
}


export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "email password is required"
            })
        }

        const userExists = await authUser.findOne({ email })

        if (!userExists) {
            return res.status(401).json({
                status: false,
                message: "user not exists"
            })
        }

        const compare = await bcrypt.compare(password, userExists.password)

        if (!compare) {
            return res.status(401).json({
                status: false,
                message: "password is incorrect"
            })
        }

        const accessToken = jwt.sign({
            role: userExists.role,
             _id: userExists._id
        }, process.env.ACCESS_JWT_SECRET, {
            expiresIn: "1h"
        })

        const refreshToken = jwt.sign({
            role: userExists.role,
            _id: userExists._id
        }, process.env.REFRESH_JWT_SECRET, {
            expiresIn: "7d"
        })


        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000 * 24 * 7
        })

        return res.status(200).json({
            status: true,
            message: "user sign in successfully",
            data: await authUser.findOne({ email }).select("-password")
        })



    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: false,
            message: "user sign in failed",
            err: error.message
        })
    }
}



export const refreshAccessToken = async (req, res) => {
    try {
        const user = req.user;

        const newAccessToken = jwt.sign(
            {
                _id: user._id,
                role: user.role,
            },
            process.env.ACCESS_JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );


        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
           
            maxAge: 60 * 60 * 1000
        });

        return res.status(200).json({
            status: true,
            message: "Access token refreshed successfully"
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};


export const signOut = async (req, res) => {
    try {
        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")

        return res.status(200).json({
            status: false,
            message: "user signout successfully"
        })

    } catch (error) {
        console.log({
            status: false,
            message: "user signout failed",
            err: error.message
        })
    }
}

export const getUser = async (req, res) => {
    try {
        const result = await authUser.find()

        return res.status(200).json({
            status: false,
            message: "all user fetching successfully",
            data: await authUser.find().select("-password")
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: false,
            message: "all user fetching failed",
            err: error.message
        })
    }
}
