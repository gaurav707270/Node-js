import mongoose from "mongoose";
import Cart from "../models/cart-model.js";
import Book from "../models/book-model.js";
import Order from "../models/order-model.js";

export const createOrder = async (req, res) => {
    const session = await mongoose.startSession();

    try {
        const { shippingAddress } = req.body;

        if (!shippingAddress || !shippingAddress.trim()) {
            return res.status(400).json({
                success: false,
                message: "shippingAddress is required"
            });
        }

        const cart = await Cart.findOne({ user: req.userId }).populate("items.book");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "your cart is empty"
            });
        }

        const orderItems = [];
        let totalAmount = 0;

        for (const item of cart.items) {
            const book = await Book.findById(item.book._id).session(session);

            if (!book || book.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `not enough stock for ${item.book.title}`
                });
            }

            orderItems.push({
                book: book._id,
                title: book.title,
                price: book.price,
                quantity: item.quantity
            });

            totalAmount += book.price * item.quantity;
        }

        await session.withTransaction(async () => {
            for (const item of orderItems) {
                const result = await Book.updateOne(
                    { _id: item.book, stock: { $gte: item.quantity } },
                    { $inc: { stock: -item.quantity } },
                    { session }
                );

                if (result.modifiedCount !== 1) {
                    throw new Error(`not enough stock for ${item.title}`);
                }
            }

            await Order.create([{
                user: req.userId,
                items: orderItems,
                totalAmount,
                shippingAddress: shippingAddress.trim()
            }], { session });

            await Cart.updateOne(
                { user: req.userId },
                { $set: { items: [] } },
                { session }
            );
        });

        const order = await Order.findOne({ user: req.userId }).sort({ createdAt: -1 });

        res.status(201).json({
            success: true,
            message: "order placed successfully",
            data: order
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    } finally {
        await session.endSession();
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            totalOrders: orders.length,
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "fullName email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            totalOrders: orders.length,
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const allowedStatuses = ["placed", "processing", "shipped", "delivered", "cancelled"];
        const { status } = req.body;

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "invalid order status"
            });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "order status updated",
            data: order
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
