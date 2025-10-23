const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        userId: { 
            type: String, 
            required: true 
        },
        userName: { 
            type: String, 
            required: true 
        },
        content: { 
            type: String, 
            required: true,
            trim: true 
        }
    },
    { timestamps: true }
);

const postSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true, index: true },
        userEmail: { type: String },
        userName: { type: String, required: true },
        title: { type: String, required: true, trim: true },
        content: { type: String, required: true },
        excerpt: { type: String, default: "" },
        featuredImage: { type: String, default: "" },
        categories: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Category" 
        }],
        tags: [{ type: String, trim: true }],
        status: { 
            type: String, 
            enum: ["draft", "published", "archived"],
            default: "published"
        },
        comments: [commentSchema],
        likes: { type: Number, default: 0 },
        views: { type: Number, default: 0 }
    }, 
    { timestamps: true }
);

// Indexes for better query performance
postSchema.index({ userId: 1, createdAt: -1 });
postSchema.index({ status: 1, createdAt: -1 });
postSchema.index({ categories: 1 });
postSchema.index({ title: "text", content: "text", tags: "text" });

// Auto-generate excerpt if not provided
postSchema.pre("save", function(next) {
    if (!this.excerpt && this.content) {
        this.excerpt = this.content.substring(0, 150) + "...";
    }
    next();
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
