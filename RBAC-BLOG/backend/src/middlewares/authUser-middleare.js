import jwt from "jsonwebtoken";


const checkUser = async (req, res, next) => {
    try {
        const {accessToken} = req.cookies

        if(!accessToken){
            return res.status(403).json({
                status:false,
                message:"access token is missing"
            })
        }

        const checkToken = jwt.verify(accessToken,process.env.ACCESS_JWT_SECRET)

        if(!checkToken){
            return res.status(401).json({
                status:false,
                message:"user is not authenticate"
            })
        }

        console.log(checkToken)

        req.user = checkToken

        next()


    } catch (error) {
        console.log(error)

        return res.status(400).json({
            status: false,
            message: "check user failed",
            err:error.message
        })
    }
}

 export default checkUser