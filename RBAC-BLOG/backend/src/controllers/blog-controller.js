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

        console.log("jijdioj", req.user.role)

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


export const deleteBlog = async (req, res) => {
    try {
        const { _id } = req.body

        const findBlog = await blog.findById(_id)

        if (findBlog.autherId.toString() !== req.user._id.toString() && findBlog.role !== "admin") {
            return res.status(400).json({
                status: false,
                message: "you cant delete this blog"
            })
        }

        const result = await blog.findByIdAndDelete(_id)

        return res.status(200).json({
            status: true,
            message: "blog deleted successfully"
        })

    } catch (error) {
        console.log(error)

        return res.status(400).json({
            status: false,
            message: "blog deleting failed",
            err: error.message
        })
    }
}



export const getBlog = async (req, res) => {
    try {
        const result = await blog.find()

        return res.status(200).json({
            status: true,
            message: "all blog fetchin successfully",
            data: result
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: false,
            message: "all blog fetching successfully",
            err: error.message
        })
    }
}




export const likeUnlikeBlog = async (req, res) => {
    try {
        const { _id} = req.body;

        const findBlog = await blog.findById(_id);

        // Check blog exists or not
        if (!findBlog) {
            return res.status(404).json({
                status: false,
                message: "Blog not found"
            });
        }

        const userId = req.user._id.toString();

        const alreadyLiked = findBlog.like.some(
            (id) => id.toString() === userId
        );

        if (alreadyLiked) {
            findBlog.like = findBlog.like.filter(
                (id) => id.toString() !== userId
            );
        } else {
            findBlog.like.push(userId);
        }

        await findBlog.save();

        return res.status(200).json({
            status: true,
            message: alreadyLiked ? "Unlike successfully" : "Like successfully",
            likes: findBlog.like.length
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
