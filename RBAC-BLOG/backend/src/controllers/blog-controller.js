import blog from "../models/blog-model.js";

export const addBlog = async (req, res) => {
    try {
        const { title, description } = req.body

        if (!title || !description) {
            return res.status(400).json({
                status: false,
                message: "title description required"
            })
        }

        console.log(req.user, "huefhihi")

        const result = await blog.create({ ...req.body, autherId: req.user._id })

        return res.status(201).json({
            status: true,
            message: "blog created successfully",
            data: result
        })



    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: false,
            message: "add blog failed",
            err: error.message
        })
    }
}


export const updateBlog = async (req, res) => {
    try {
        const { _id } = req.body

        const findBlog = await blog.findById(_id)

        console.log("jijdioj",req.user.role)

        if (findBlog.autherId.toString() !== req.user._id.toString() && req.user.role.toString() !== "admin") {
            return res.status(400).json({
                status: false,
                message: "you cant update blog"
            })
        }

        const result = await blog.findByIdAndUpdate(_id, req.body)

        return res.status(200).json({
            status: false,
            message: "blog updated successsfully",
            data: result
        })


    } catch (error) {
        console.log(error)

        return res.status(400).json({
            status: false,
            message: "updat blog failed",
            err: error.message
        })
    }
}