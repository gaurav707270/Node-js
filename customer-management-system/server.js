require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const customerRoutes = require("./routes/customerRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/", customerRoutes);

app.get("/", (req, res) => {
    res.send("Customer Management API Running...");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});