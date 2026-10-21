import Cart from "../models/cart-model.js";
import Book from "../models/book-model.js";

export const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.userId }).populate("items.book");

        if (!cart) {
            cart = await Cart.create({ user: req.userId, items: [] });
            cart = await Cart.findById(cart._id).populate("items.book");
        }

        res.status(200).json({
            success: true,
            data: cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const addToCart = async (req, res) => {
    try {
        const { bookId, quantity = 1 } = req.body;
        const parsedQuantity = Number(quantity);

        if (!bookId || !Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
            return res.status(400).json({
                success: false,
                message: "valid bookId and quantity are required"
            });
        }

        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "book not found"
            });
        }

        if (book.stock < parsedQuantity) {
            return res.status(400).json({
                success: false,
                message: "not enough stock available"
            });
        }

        let cart = await Cart.findOne({ user: req.userId });

        if (!cart) {
            cart = await Cart.create({ user: req.userId, items: [] });
        }

        const item = cart.items.find((item) => item.book.toString() === bookId);

        if (item) {
            if (item.quantity + parsedQuantity > book.stock) {
                return res.status(400).json({
                    success: false,
                    message: "requested quantity exceeds available stock"
                });
            }
            item.quantity += parsedQuantity;
        } else {
            cart.items.push({ book: bookId, quantity: parsedQuantity });
        }

        await cart.save();
        await cart.populate("items.book");

        res.status(200).json({
            success: true,
            message: "book added to cart",
            data: cart
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const updateCartItem = async (req, res) => {
    try {
        const quantity = Number(req.body.quantity);

        if (!Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "quantity must be a positive integer"
            });
        }

        const cart = await Cart.findOne({ user: req.userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "cart not found"
            });
        }

        const item = cart.items.find((item) => item.book.toString() === req.params.bookId);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "book not found in cart"
            });
        }

        const book = await Book.findById(req.params.bookId);

        if (!book || quantity > book.stock) {
            return res.status(400).json({
                success: false,
                message: "requested quantity is not available"
            });
        }

        item.quantity = quantity;
        await cart.save();
        await cart.populate("items.book");

        res.status(200).json({
            success: true,
            message: "cart updated successfully",
            data: cart
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const removeCartItem = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "cart not found"
            });
        }

        cart.items = cart.items.filter((item) => item.book.toString() !== req.params.bookId);
        await cart.save();
        await cart.populate("items.book");

        res.status(200).json({
            success: true,
            message: "item removed from cart",
            data: cart
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
