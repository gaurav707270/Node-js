import comment from "../models/comment-model.js";
import reply from "../models/reply.model.js";


export const addReply = async (req, res) => {
    try {

        const { text, _id } = req.body

        if (!text) {
            return res.status(400).json({
                status: false,
                message: "reply is  required "
            })
        }

        const findComment = await comment.findById(_id)

        console.log("JKJIJIOJ",findComment)

        const result = await reply.create({ ...req.body, userId: req.user._id , blogId:findComment.blogId})

        return res.status(201).json({
            status: true,
            message: "reply create successfully",
            data: result
        })

    } catch (error) {
        console.log(error)

        return res.status(400).json({
            status: false,
            message: "create reply failed",
            err: error.message
        })
    }
}




export const deleteReply = async (req, res) => {
    try {
        const { _id } = req.body

        const findReply = await reply.findById(_id)

        if (!findReply) {
            return res.status(404).json({
                status: false,
                message: "reply not found"
            })
        }

        if (findReply.userId.toString() !== req.user._id.toString() && req.user.role.toString() !== "admin") {
            return res.status(403).json({
                status: false,
                message: "you cant delete this reply"
            })
        }

        const result = await reply.findByIdAndDelete(_id)

        return res.status(200).json({
            status: false,
            message: "reply deleted successfully"
        })

    } catch (error) {
        console.log(error)

        return res.status(400).json({
            status: false,
            message: "deleting reply failed",
            err: error.message
        })
    }
}



export const ownReply = async (req, res) => {
    try {

        const allReply = await reply.find()

        const myReply = allReply.filter((reply) => reply.userId.toString() == req.user._id.toString())

        return res.status(200).json({
            status: true,
            message: "all own reply fetching successfully",
            data: myReply
        })

    } catch (error) {
        console.log(error)

        return res.status(400).json({
            status: false,
            message: "own reply fetching failed",
            err: error.message
        })
    }
}



export const likeUnlikeReply = async(req,res) =>{
    try {
        const {_id} = req.body

        const allReply = await reply.findById(_id)

        let  likes  = allReply.like || []

        allReply.like = likes

        let allreadyLike = likes.some((like) => like.toString() == req.user._id.toString())

        if(allreadyLike){
             allReply.like = likes.filter((like) => like.toString() !== req.user._id)
        }else{
            allReply.like.push(req.user._id)
        }

        await allReply.save()

        return res.status(200).json({
            status:true,
            message:allreadyLike? "reply unlike ":"reply like",
            data:allReply
        })

        
    } catch (error) {
        console.log(error)

        return res.status(400).json({
            status:false,
            message:"like unlike reply failed",
            err:error.message
        })
    }
}