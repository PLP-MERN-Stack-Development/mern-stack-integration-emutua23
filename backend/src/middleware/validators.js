const { body, param, query, validationResult } = require("express-validator");

// Middleware to check validation results
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            message: "Validation failed", 
            errors: errors.array() 
        });
    }
    next();
};

// Post validators
const postValidators = {
    create: [
        body("title")
            .trim()
            .notEmpty().withMessage("Title is required")
            .isLength({ min: 5, max: 200 }).withMessage("Title must be between 5 and 200 characters"),
        body("content")
            .trim()
            .notEmpty().withMessage("Content is required")
            .isLength({ min: 10 }).withMessage("Content must be at least 10 characters"),
        body("categories")
            .optional()
            .isArray().withMessage("Categories must be an array"),
        body("tags")
            .optional()
            .isArray().withMessage("Tags must be an array"),
        body("status")
            .optional()
            .isIn(["draft", "published", "archived"]).withMessage("Invalid status"),
        validate
    ],
    update: [
        param("id").isMongoId().withMessage("Invalid post ID"),
        body("title")
            .optional()
            .trim()
            .isLength({ min: 5, max: 200 }).withMessage("Title must be between 5 and 200 characters"),
        body("content")
            .optional()
            .trim()
            .isLength({ min: 10 }).withMessage("Content must be at least 10 characters"),
        validate
    ]
};

// Category validators
const categoryValidators = {
    create: [
        body("name")
            .trim()
            .notEmpty().withMessage("Category name is required")
            .isLength({ min: 2, max: 50 }).withMessage("Name must be between 2 and 50 characters"),
        body("description")
            .optional()
            .trim(),
        body("color")
            .optional()
            .matches(/^#[0-9A-Fa-f]{6}$/).withMessage("Color must be a valid hex color"),
        validate
    ]
};

// Auth validators
const authValidators = {
    register: [
        body("username")
            .trim()
            .notEmpty().withMessage("Username is required")
            .isLength({ min: 3, max: 30 }).withMessage("Username must be between 3 and 30 characters")
            .matches(/^[a-zA-Z0-9_]+$/).withMessage("Username can only contain letters, numbers, and underscores"),
        body("email")
            .trim()
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Must be a valid email address"),
        body("password")
            .notEmpty().withMessage("Password is required")
            .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
        validate
    ],
    login: [
        body("email")
            .trim()
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Must be a valid email address"),
        body("password")
            .notEmpty().withMessage("Password is required"),
        validate
    ]
};

// Comment validators
const commentValidators = {
    create: [
        param("id").isMongoId().withMessage("Invalid post ID"),
        body("content")
            .trim()
            .notEmpty().withMessage("Comment content is required")
            .isLength({ min: 1, max: 500 }).withMessage("Comment must be between 1 and 500 characters"),
        validate
    ]
};

module.exports = {
    postValidators,
    categoryValidators,
    authValidators,
    commentValidators
};
