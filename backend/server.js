import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import blogRoute from "./routes/blogRoute.js";
import commentRoute from "./routes/commentRoute.js";
import likeRoute from "./routes/likeRoute.js";

// Dotenv Config
dotenv.config();

// Port configuration
const PORT = process.env.PORT;

// Route Setup
const app = express();

// Cookie parser
app.use(cookieParser());

// To parse JSON
app.use(express.json());

// Cors
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Auth Route
app.use('/api/auth', authRoute);

// User Route
app.use('/api/user', userRoute);

// Category Route
app.use('/api/category', categoryRoute);

// Blogs Route
app.use('/api/blog', blogRoute);

// Comment Route
app.use('/api/comment', commentRoute);

// Like Route
app.use('/api/blog-like', likeRoute);

// mongoose setup
mongoose
  .connect(process.env.MONGODB_URI, { dbName: "blogify" })
  .then(() => console.log("Database is Connected Successfully!!"))
  .catch((err) => console.log("Darabase Connection is Failes!!", err));

// APP Port
app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});

// Error Handlong
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
});
