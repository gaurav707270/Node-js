import jwt from "jsonwebtoken";

export const refreshTokenMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Refresh token required"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.REFRESH_JWT_SECRET
        );

        console.log(decoded)

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            status: false,
            message: "Invalid or expired refresh token"
        });
    }
};