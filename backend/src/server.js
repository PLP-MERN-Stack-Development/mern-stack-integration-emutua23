const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const { connectDB } = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

// Import routes
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const categoryRouter = require("./routes/categories");

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving for uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.get("/", (req, res) => res.send("Blog API is up and running..."));
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/categories", categoryRouter);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`API is running on http://localhost:${PORT}`);
});
