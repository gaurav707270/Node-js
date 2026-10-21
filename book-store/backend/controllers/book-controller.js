import Book from "../models/book-model.js";

export const createBook = async (req, res) => {
    try {
        const { title, author, description, price, category, stock, image } = req.body;

        const book = await Book.create({
            title,
            author,
            description,
            price,
            category,
            stock,
            image
        });

        res.status(201).json({
            success: true,
            message: "book created successfully",
            data: book
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const getAllBooks = async (req, res) => {
    try {
        const { search, category, page = 1, limit = 12 } = req.query;
        const filter = {};

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { author: { $regex: search, $options: "i" } }
            ];
        }

        if (category) {
            filter.category = category;
        }

        const pageNumber = Math.max(Number.parseInt(page, 10) || 1, 1);
        const limitNumber = Math.min(Math.max(Number.parseInt(limit, 10) || 12, 1), 100);

        const [books, totalBooks] = await Promise.all([
            Book.find(filter)
                .sort({ createdAt: -1 })
                .skip((pageNumber - 1) * limitNumber)
                .limit(limitNumber),
            Book.countDocuments(filter)
        ]);

        res.status(200).json({
            success: true,
            totalBooks,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalBooks / limitNumber),
            data: books
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getSingleBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "book not found"
            });
        }

        res.status(200).json({
            success: true,
            data: book
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "invalid book id"
        });
    }
};

export const updateBook = async (req, res) => {
    try {
        const allowedFields = ["title", "author", "description", "price", "category", "stock", "image"];
        const updates = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        const book = await Book.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "book not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "book updated successfully",
            data: book
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "book not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "book deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "invalid book id"
        });
    }
};
