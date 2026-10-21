import express from "express";
import authMiddleware from "../middleware/auth-middleware.js";
import {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem
} from "../controllers/cart-controller.js";

const router = express.Router();

router.use(authMiddleware);
router.get("/", getCart);
router.post("/items", addToCart);
router.patch("/items/:bookId", updateCartItem);
router.delete("/items/:bookId", removeCartItem);

export default router;
