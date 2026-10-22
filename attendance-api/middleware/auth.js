import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. Token is required."
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.facultyId = decoded.facultyId;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
};

export default auth;
