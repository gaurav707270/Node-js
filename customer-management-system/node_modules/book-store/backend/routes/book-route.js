import express from "express";
import {
    createBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook
} from "../controllers/book-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";
import adminMiddleware from "../middleware/admin-middleware.js";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getSingleBook);
router.post("/", authMiddleware, adminMiddleware, createBook);
router.put("/:id", authMiddleware, adminMiddleware, updateBook);
router.delete("/:id", authMiddleware, adminMiddleware, deleteBook);

export default router;
