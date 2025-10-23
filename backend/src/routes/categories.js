const express = require("express");
const Category = require("../models/Category");
const { categoryValidators } = require("../middleware/validators");
const router = express.Router();

// Helper function to create URL-friendly slug
const createSlug = (text) => {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')      // Replace spaces with hyphens
        .replace(/-+/g, '-')       // Replace multiple hyphens with single
        .trim();
};

// GET /api/categories - Get all categories
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/categories/:id - Get a single category
router.get("/:id", async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/categories - Create a new category
router.post("/", categoryValidators.create, async (req, res) => {
    try {
        const { name, description, color } = req.body;

        // Auto-generate slug from name
        const slug = createSlug(name);

        const category = await Category.create({
            name,
            slug,
            description,
            color
        });

        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/categories/:id - Update a category
router.put("/:id", async (req, res) => {
    try {
        const { name, description, color } = req.body;
        
        // If name is being updated, regenerate slug
        const updateData = { name, description, color };
        if (name) {
            updateData.slug = createSlug(name);
        }
        
        const updated = await Category.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /api/categories/:id - Delete a category
router.delete("/:id", async (req, res) => {
    try {
        const result = await Category.deleteOne({ _id: req.params.id });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json({ ok: true, message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;