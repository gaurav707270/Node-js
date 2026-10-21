const adminMiddleware = (req, res, next) => {
    if (req.userRole !== "admin") {
        return res.status(403).json({
            success: false,
            message: "admin access required"
        });
    }

    next();
};

export default adminMiddleware;
