import comment from "../models/comment-model.js";


export const addComment = async (req, res) => {
    try {

        const { text, blogId } = req.body

        if (!text || !blogId) {
            return res.status(400).json({
                status: false,
                message: "comment and blogId required"
            })
        }

        console.log("dehejhdfeiuh", req.user._id)

        const result = await comment.create({ ...req.body, userId: req.user._id })

        return res.status(201).json({
            status: true,
            message: "comment created successfully",
            data: result
        })


    } catch (error) {
        console.log(error)

        return res.status(400).json({
            status: false,
            message: "comment creating failed",
            err: error.message
        })
    }
}


export const deleteComment = async (req, res) => {
    try {
        const { _id } = req.body

        const findComment = await comment.findById(_id)

        if (findComment.userId.toString() !== req.user._id.toString() && req.user.role.toString() !== "admin") {
            return res.status(403).json({
                status: false,
                message: "you cant delete this comment"
            })
        }

        const result = await comment.findByIdAndDelete(_id)


        return res.status(200).json({
            status: true,
            message: "comment deleted syuccessfully"
        })

    } catch (error) {
        console.log(error)

        return res.status(400).json({
            status: false,
            message: "deleting comment failed",
            err: error.message
        })
    }
}


export const ownComment = async (req, res) => {
    try {

        const allComment = await comment.find()

        const myComment = allComment.filter((comm) => comm.userId.toString() == req.user._id.toString())

        return res.status(200).json({
            status: false,
            message: "own comment fetching successfully",
            data: myComment
        })

    } catch (error) {
        console.log(error)

        return res.status(400).json({
            status: false,
            message: "own comment fetching failed",
            err: error.message
        })
    }
}


export const likeUnlikeComment = async (req, res) => {
    try {

        const { _id } = req.body

        const findComment = await comment.findById(_id)

        if (!findComment) {
            return res.status(404).json({
                status: false,
                message: "Comment not found"
            })
        }

        const commentLike = findComment.like || []
        findComment.like = commentLike

        const alreadyLike = commentLike.some(
            (like) => like.toString() === req.user._id.toString()
        )

        if (alreadyLike) {
            findComment.like = commentLike.filter(
                (like) => like.toString() !== req.user._id.toString()
            )
        } else {
            findComment.like.push(req.user._id.toString())
        }

        await findComment.save()

        return res.status(200).json({
            status: true,
            message: alreadyLike ? "comment unlike" : "comment like",
            data: findComment
        })

    } catch (error) {
        console.log(error)

        return res.status(400).json({
            status: false,
            message: 'like unlike comment failed',
            err: error.message
        })
    }
}