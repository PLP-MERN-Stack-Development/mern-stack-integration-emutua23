const express = require("express");
const Post = require("../models/Post");
const { postValidators, commentValidators } = require("../middleware/validators");
const router = express.Router();

// GET /api/posts - Get all posts with filtering, searching, and pagination
router.get("/", async (req, res) => {
    try {
        const { 
            userId, 
            category, 
            status, 
            search, 
            page = 1, 
            limit = 10 
        } = req.query;

        // Build filter object
        const filter = {};
        if (userId) filter.userId = userId;
        if (category) filter.categories = category;
        if (status) filter.status = status;
        
        // Add text search if search query provided
        if (search) {
            filter.$text = { $search: search };
        }

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Execute query with pagination
        const posts = await Post.find(filter)
            .populate("categories", "name slug color")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        // Get total count for pagination
        const total = await Post.countDocuments(filter);

        res.json({
            posts,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/posts/:id - Get a single post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate("categories", "name slug color");

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Increment views
        post.views += 1;
        await post.save();

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/posts - Create a new post
router.post("/", postValidators.create, async (req, res) => {
    try {
        const { 
            userId, 
            userEmail, 
            userName, 
            title, 
            content, 
            excerpt,
            featuredImage,
            categories, 
            tags, 
            status 
        } = req.body;

        if (!userId || !userName) {
            return res.status(400).json({ message: "User information is required" });
        }

        const post = await Post.create({
            userId,
            userEmail,
            userName,
            title,
            content,
            excerpt,
            featuredImage,
            categories,
            tags,
            status: status || "published"
        });

        // Populate categories before sending response
        await post.populate("categories", "name slug color");

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/posts/:id - Update a post
router.put("/:id", postValidators.update, async (req, res) => {
    try {
        const { title, content, excerpt, featuredImage, categories, tags, status } = req.body;

        const updated = await Post.findByIdAndUpdate(
            req.params.id,
            { 
                $set: { 
                    title, 
                    content, 
                    excerpt,
                    featuredImage,
                    categories, 
                    tags, 
                    status 
                } 
            },
            { new: true, runValidators: true }
        ).populate("categories", "name slug color");

        if (!updated) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /api/posts/:id - Delete a post
router.delete("/:id", async (req, res) => {
    try {
        const result = await Post.deleteOne({ _id: req.params.id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json({ ok: true, message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/posts/:id/comments - Add a comment to a post
router.post("/:id/comments", commentValidators.create, async (req, res) => {
    try {
        const { userId, userName, content } = req.body;

        if (!userId || !userName) {
            return res.status(400).json({ message: "User information is required" });
        }

        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        post.comments.push({ userId, userName, content });
        await post.save();

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /api/posts/:id/comments/:commentId - Delete a comment
router.delete("/:id/comments/:commentId", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        post.comments = post.comments.filter(
            comment => comment._id.toString() !== req.params.commentId
        );
        await post.save();

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/posts/:id/like - Toggle like on a post
router.post("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Simple like increment (in production, track user likes)
        post.likes += 1;
        await post.save();

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
