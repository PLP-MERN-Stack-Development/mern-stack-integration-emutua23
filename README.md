# Week 4 MERN Blog App - Enhanced Edition

A production-ready full-stack MERN (MongoDB, Express, React, Node.js) blog application with comprehensive features including user authentication, categories, comments, search, pagination, and more. Built with modern UI using React, Tailwind CSS, and Radix UI components.

## 📸 Screenshots

Check out the `screenshots/` folder to see the application in action:
- **Blog Landing Page.png** - Homepage with all posts
- **Signed In User Create Category View.png** - Category management interface
- **Signed In User Create Post View.png** - Post creation form

---


## 📋 Table of Contents

- [[Screenshots](#screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation Guide](#installation-guide)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Frontend Architecture](#frontend-architecture)
- [Testing Guide](#testing-guide)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Assignment Completion](#assignment-completion)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### Core Features (CRUD Operations)
- ✅ **Full CRUD** - Create, Read, Update, and Delete blog posts
- ✅ **User Management** - User-specific posts with authentication
- ✅ **Real-time Updates** - Instant UI updates with optimistic rendering
- ✅ **Category System** - Organize posts with color-coded categories
- ✅ **Tag Support** - Multiple tags per post for better organization
- ✅ **Post Status** - Draft, Published, and Archived states
- ✅ **Rich Content** - Support for long-form content and excerpts

### Advanced Features
- ✅ **JWT Authentication** - Secure user registration and login
- ✅ **Comments System** - Threaded comments with CRUD operations
- ✅ **Full-Text Search** - Search across titles, content, and tags
- ✅ **Advanced Filtering** - Filter by category, status, and user
- ✅ **Pagination** - Efficient pagination for large datasets
- ✅ **Post Engagement** - View counts, likes, and comment tracking
- ✅ **Category Management** - Visual category organization
- ✅ **Responsive Design** - Mobile-first responsive interface
- ✅ **Input Validation** - Client and server-side validation
- ✅ **Error Handling** - Comprehensive error management

### UI/UX Features
- 🎨 **Modern Interface** - Clean and professional design
- 📱 **Mobile Responsive** - Optimized for all screen sizes
- ♿ **Accessible** - WCAG compliant with Radix UI
- ⚡ **Fast Performance** - Optimized loading and rendering
- 🌙 **Loading States** - Visual feedback during operations
- 🎯 **Intuitive Navigation** - Clear and easy to use

---

## 🛠️ Tech Stack

### Frontend Technologies
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.1.1 | UI library for building components |
| Vite | 7.1.7 | Fast build tool and dev server |
| React Router DOM | 6.26.0 | Client-side routing and navigation |
| Tailwind CSS | 4.1.14 | Utility-first CSS framework |
| Radix UI | Latest | Accessible headless UI components |
| Axios | 1.12.2 | Promise-based HTTP client |
| Clerk | 5.53.1 | Authentication and user management |
| Lucide React | 0.546.0 | Beautiful icon set |
| Class Variance Authority | 0.7.1 | Component variant management |

### Backend Technologies
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 18+ | JavaScript runtime environment |
| Express | 5.1.0 | Web application framework |
| MongoDB | Latest | NoSQL document database |
| Mongoose | 8.19.1 | MongoDB object modeling (ODM) |
| JWT | 9.0.2 | JSON Web Token authentication |
| bcryptjs | 2.4.3 | Password hashing library |
| express-validator | 7.0.1 | Request validation middleware |
| CORS | 2.8.5 | Cross-origin resource sharing |
| dotenv | 17.2.3 | Environment variable management |
| Multer | 1.4.5 | Multipart form data handling |

---

## 📁 Project Structure

```
mern-stack-integration-emutua23/
│
├── backend/                           # Backend Node.js application
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                 # MongoDB connection configuration
│   │   │
│   │   ├── models/                   # Mongoose data models
│   │   │   ├── User.js              # User schema with authentication
│   │   │   ├── Post.js              # Blog post schema with relations
│   │   │   └── Category.js          # Category schema with slug
│   │   │
│   │   ├── routes/                   # API route handlers
│   │   │   ├── auth.js              # Authentication endpoints
│   │   │   ├── posts.js             # Post CRUD endpoints
│   │   │   └── categories.js        # Category management endpoints
│   │   │
│   │   ├── middleware/               # Custom middleware functions
│   │   │   ├── auth.js              # JWT authentication middleware
│   │   │   ├── errorHandler.js      # Global error handler
│   │   │   └── validators.js        # Request validation rules
│   │   │
│   │   ├── seeds/                    # Database seed files
│   │   │   └── sampleData.js        # Sample data for testing
│   │   │
│   │   └── server.js                 # Express server entry point
│   │
│   ├── .env                          # Environment variables (not in git)
│   ├── .env.example                  # Environment template
│   ├── .gitignore                    # Git ignore rules
│   └── package.json                  # Backend dependencies
│
├── frontend/                          # Frontend React application
│   ├── src/
│   │   ├── assets/                   # Static assets (images, fonts)
│   │   │
│   │   ├── components/               # React components
│   │   │   ├── ui/                  # Reusable UI components
│   │   │   │   ├── button.jsx       # Button component
│   │   │   │   ├── card.jsx         # Card component
│   │   │   │   ├── input.jsx        # Input field component
│   │   │   │   ├── textarea.jsx     # Textarea component
│   │   │   │   └── badge.jsx        # Badge component
│   │   │   │
│   │   │   ├── PostCard.jsx         # Post display card
│   │   │   ├── NewPostDialog.jsx    # Create post modal
│   │   │   └── CategoryManager.jsx  # Category management UI
│   │   │
│   │   ├── lib/                      # Utility libraries
│   │   │   ├── api.js               # API client (Axios wrapper)
│   │   │   └── utils.js             # Helper functions
│   │   │
│   │   ├── pages/                    # Page components (Routes)
│   │   │   ├── Dashboard.jsx        # User's posts dashboard
│   │   │   ├── AllPosts.jsx         # Public posts listing
│   │   │   ├── PostDetail.jsx       # Single post view
│   │   │   └── Categories.jsx       # Category management page
│   │   │
│   │   ├── App.jsx                   # Root component with routing
│   │   ├── main.jsx                  # Application entry point
│   │   └── index.css                 # Global styles (Tailwind)
│   │
│   ├── public/                       # Public static files
│   │   └── vite.svg                 # Vite logo
│   │
│   ├── .env                          # Environment variables (not in git)
│   ├── .env.example                  # Environment template
│   ├── .gitignore                    # Git ignore rules
│   ├── index.html                    # HTML entry point
│   ├── vite.config.js                # Vite configuration
│   ├── jsconfig.json                 # JavaScript config
│   ├── components.json               # Shadcn UI config
│   ├── eslint.config.js              # ESLint configuration
│   └── package.json                  # Frontend dependencies
│
├── screenshots/                       # Application screenshots
│   ├── Blog Landing Page.png         # Homepage view
│   ├── Signed In User Create Category View.png  # Category creation
│   └── Signed In User Create Post View.png      # Post creation
│
├── server/                            # Additional server files
│   └── models/
│       └── Post.js                   # Alternative Post model
│
├── .gitignore                         # Root git ignore
├── README.md                          # This file
├── QUICKSTART.md                      # Quick setup guide
├── API_DOCUMENTATION.md               # Detailed API docs
├── SETUP_GUIDE.md                     # Setup instructions
└── Week4-Assignment.md                # Assignment requirements

```

### Directory Explanation

#### Backend Structure
- **`config/`** - Configuration files for database and external services
- **`models/`** - Database schemas and models using Mongoose ODM
  - **Category.js** - Now includes slug field with auto-generation
- **`routes/`** - Express route handlers organized by resource
  - **categories.js** - Updated to auto-generate slugs
- **`middleware/`** - Custom middleware for authentication, validation, etc.
- **`seeds/`** - Scripts to populate database with sample data
  - **sampleData.js** - Includes slug fields for categories
- **`server.js`** - Main entry point that initializes Express server

#### Frontend Structure
- **`components/`** - Reusable React components organized by function
- **`pages/`** - Top-level page components mapped to routes
- **`lib/`** - Utility functions and API client logic
- **`assets/`** - Static files like images and fonts

#### Screenshots Structure
- **`screenshots/`** - Visual documentation of the application
  - Contains screenshots showing key features and user interfaces
  - Useful for README previews and documentation

---

## 📋 Prerequisites

Before starting, ensure you have these tools installed:

### Required Software

| Software | Minimum Version | Download Link | Purpose |
|----------|----------------|---------------|---------|
| Node.js | v18.0.0 | [nodejs.org](https://nodejs.org/) | JavaScript runtime |
| npm | v9.0.0 | Comes with Node.js | Package manager |
| MongoDB | v6.0.0 | [mongodb.com](https://www.mongodb.com/try/download/community) | Database |
| Git | Latest | [git-scm.com](https://git-scm.com/) | Version control |

### Optional Tools
- **MongoDB Compass** - GUI for MongoDB (recommended for beginners)
- **Postman** - API testing tool
- **VS Code** - Recommended code editor with extensions:
  - ESLint
  - Prettier
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense

### Verify Installation

```bash
# Check Node.js version
node --version
# Expected output: v18.x.x or higher

# Check npm version
npm --version
# Expected output: 9.x.x or higher

# Check MongoDB version
mongod --version
# Expected output: db version v6.x.x or higher

# Check Git version
git --version
# Expected output: git version 2.x.x
```

---

## 🚀 Installation Guide

Follow these steps carefully to set up the project on your local machine.

### Step 1: Clone the Repository

```bash
# Clone from GitHub Classroom
git clone https://github.com/PLP-MERN-Stack-Development/mern-stack-integration-emutua23.git
cd mern-stack-integration-emutua23

# Or if you downloaded the ZIP file
unzip mern-stack-integration-emutua23
cd mern-stack-integration-emutua23
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install all dependencies
npm install

# This will install:
# - express, mongoose, cors, dotenv
# - bcryptjs, jsonwebtoken
# - express-validator
# - multer (for future image uploads)

# Expected output: "added XXX packages" with no errors
```

**Common Installation Issues:**
- If you see `EACCES` permission errors, use `sudo npm install` (macOS/Linux)
- If you see network errors, check your internet connection
- If you see dependency conflicts, try `npm install --legacy-peer-deps`

### Step 3: Frontend Setup

```bash
# Open a new terminal window
cd frontend

# Install all dependencies
npm install

# This will install:
# - react, react-dom, react-router-dom
# - vite
# - tailwindcss, @tailwindcss/vite
# - @radix-ui/* components
# - axios, @clerk/clerk-react
# - lucide-react, clsx, tailwind-merge

# Expected output: "added XXX packages" with no errors
```

### Step 4: Database Setup

#### Option A: Local MongoDB

```bash
# Start MongoDB service

# On macOS (with Homebrew):
brew services start mongodb-community

# On Linux (Ubuntu):
sudo systemctl start mongod
sudo systemctl enable mongod

# On Windows:
# Start MongoDB from Services or run:
net start MongoDB

# Verify MongoDB is running:
mongosh
# You should see: "Current Mongosh Log ID: ..."
# Type 'exit' to close
```

#### Option B: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a new cluster (M0 Free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Replace `myFirstDatabase` with your desired database name

Example connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/blog-app?retryWrites=true&w=majority
```

---

## ⚙️ Configuration

### Backend Environment Variables

1. **Create `.env` file** in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

2. **Edit `.env` file** with your configuration:

```env
# ===========================================
# DATABASE CONFIGURATION
# ===========================================
# Local MongoDB (default)
MONGODB_URI=mongodb://localhost:27017/blog-app

# OR MongoDB Atlas (cloud)
# MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/blog-app?retryWrites=true&w=majority

# ===========================================
# SERVER CONFIGURATION
# ===========================================
# Port number for the API server
PORT=5000

# Allowed frontend origin for CORS
ALLOWED_ORIGIN=http://localhost:5173

# ===========================================
# JWT AUTHENTICATION
# ===========================================
# Secret key for signing JWT tokens (CHANGE THIS IN PRODUCTION!)
# Generate a secure key: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Token expiration time (e.g., 7d, 24h, 60m)
JWT_EXPIRATION=7d

# ===========================================
# OPTIONAL: FILE UPLOAD
# ===========================================
# Maximum file size for uploads (in bytes)
MAX_FILE_SIZE=5242880

# Allowed file types
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/jpg
```

**Security Notes:**
- ⚠️ **Never commit `.env` to Git**
- 🔒 Generate a secure JWT_SECRET for production
- 🔐 Use strong database passwords
- 🛡️ Change default credentials

### Frontend Environment Variables

1. **Create `.env` file** in the `frontend` directory:

```bash
cd frontend
cp .env.example .env
```

2. **Edit `.env` file**:

```env
# ===========================================
# API CONFIGURATION
# ===========================================
# Backend API URL (must match backend PORT)
VITE_API_URL=http://localhost:5000

# ===========================================
# CLERK AUTHENTICATION
# ===========================================
# Clerk Publishable Key (get from clerk.com)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Get Clerk Authentication Key

**Clerk** provides user authentication, management, and security.

#### Step-by-Step Setup:

1. **Sign Up**
   - Visit [clerk.com](https://clerk.com)
   - Click "Start building for free"
   - Sign up with GitHub, Google, or email

2. **Create Application**
   - Click "+ Create application"
   - Name: "MERN Blog App"
   - Choose authentication methods:
     - ✅ Email
     - ✅ Google (recommended)
     - ✅ GitHub (optional)

3. **Get Publishable Key**
   - Go to "API Keys" in dashboard
   - Copy "Publishable Key" (starts with `pk_test_...`)
   - Paste into `frontend/.env`:
     ```env
     VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
     ```

4. **Configure Application**
   - Go to "Paths" settings
   - Set Sign-in URL: `/sign-in`
   - Set Sign-up URL: `/sign-up`
   - Set After sign-in URL: `/`

**Why Clerk?**
- 🔒 Secure authentication out of the box
- 👤 User management dashboard
- 🌐 Social login providers
- 📧 Email verification
- 🔐 Session management
- 💰 Free tier for development

---

## 🏃 Running the Application

### Development Mode

You'll need **THREE terminal windows** running simultaneously:

#### Terminal 1: MongoDB (if using local)

```bash
# Start MongoDB
mongod

# Keep this terminal running
# You should see: "Waiting for connections on port 27017"
```

#### Terminal 2: Backend Server

```bash
# Navigate to backend
cd backend

# Start development server with auto-reload
npm run dev

# Expected output:
# > backend@1.0.0 dev
# > nodemon src/server.js
# 
# [nodemon] starting `node src/server.js`
# MongoDB Connected.....!
# API is running on http://localhost:5000
```

**Backend is ready when you see:**
- ✅ "MongoDB Connected.....!"
- ✅ "API is running on http://localhost:5000"

#### Terminal 3: Frontend Server

```bash
# Navigate to frontend
cd frontend

# Start development server
npm run dev

# Expected output:
# 
#   VITE v7.1.7  ready in XXX ms
# 
#   ➜  Local:   http://localhost:5173/
#   ➜  Network: use --host to expose
#   ➜  press h + enter to show help
```

**Frontend is ready when you see:**
- ✅ "Local: http://localhost:5173/"

### Access the Application

1. **Open your browser**
2. **Navigate to:** `http://localhost:5173`
3. **You should see** the Blog App homepage
4. **Click "Sign In"** to create an account or login

### First-Time Setup Checklist

After the app loads:

1. ✅ **Sign Up** - Create your first user account
2. ✅ **Create Categories** - Go to "Categories" page
   - Add categories like: Technology, Lifestyle, Business
3. ✅ **Create First Post** - Go to "My Posts" → "New Post"
4. ✅ **Test Features**:
   - Create a post
   - Add a comment
   - Search for posts
   - Filter by category

### Optional: Seed Sample Data

To quickly populate the database with sample posts and categories:

```bash
cd backend
npm run seed

# Expected output:
# MongoDB Connected for seeding...
# Clearing existing data...
# Inserting categories...
# ✓ Inserted 5 categories
# Inserting posts...
# ✓ Inserted 5 posts
# 
# ✨ Database seeded successfully!
```

This will create:
- 5 sample categories (Technology, Lifestyle, Business, Travel, Food)
- 5 sample blog posts with comments
- Demo user data

---

## 📡 API Documentation

Comprehensive API reference for all endpoints.

### Base URL

```
http://localhost:5000/api
```

### Response Format

All API responses follow this consistent structure:

**Success Response:**
```json
{
  "data": { ... },
  "message": "Success message",
  "status": 200
}
```

**Error Response:**
```json
{
  "message": "Error description",
  "errors": [ ... ],
  "status": 400
}
```

---

### Authentication Endpoints

#### Register New User

Creates a new user account with hashed password.

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Validation Rules:**
- `username`: 3-30 characters, alphanumeric + underscore
- `email`: Valid email format
- `password`: Minimum 6 characters
- `firstName`, `lastName`: Optional

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f1234567890abcdef12345",
    "username": "johndoe",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

**Error Responses:**
- `400`: Validation failed
- `400`: Email already registered
- `400`: Username already taken

**cURL Example:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "SecurePass123!",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

---

#### Login User

Authenticates user and returns JWT token.

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f1234567890abcdef12345",
    "username": "johndoe",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

**Error Responses:**
- `401`: Invalid email or password
- `400`: Validation failed

**Using the Token:**

Include the token in subsequent requests:
```bash
curl -X GET http://localhost:5000/api/posts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### Posts Endpoints

#### Get All Posts

Retrieves paginated list of posts with filtering and search.

**Endpoint:** `GET /api/posts`

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `limit` | integer | 10 | Posts per page (max 100) |
| `userId` | string | - | Filter by author |
| `category` | string | - | Filter by category ID |
| `status` | string | - | Filter by status (draft/published/archived) |
| `search` | string | - | Full-text search query |

**Example Request:**
```bash
GET /api/posts?page=1&limit=10&category=64f1234567890abc&search=react
```

**Success Response (200):**
```json
{
  "posts": [
    {
      "_id": "64f1234567890abcdef12345",
      "userId": "user_abc123",
      "userName": "John Doe",
      "userEmail": "john@example.com",
      "title": "Getting Started with React",
      "content": "React is a powerful JavaScript library...",
      "excerpt": "Learn React basics...",
      "featuredImage": "",
      "categories": [
        {
          "_id": "64f1234567890abc",
          "name": "Technology",
          "slug": "technology",
          "color": "#3b82f6"
        }
      ],
      "tags": ["react", "javascript", "tutorial"],
      "status": "published",
      "comments": [],
      "likes": 15,
      "views": 234,
      "createdAt": "2025-10-15T10:30:00.000Z",
      "updatedAt": "2025-10-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pages": 5
  }
}
```

**cURL Example:**
```bash
curl http://localhost:5000/api/posts?page=1&limit=5&search=react
```

---

#### Get Single Post

Retrieves a specific post by ID. Automatically increments view count.

**Endpoint:** `GET /api/posts/:id`

**URL Parameters:**
- `id`: MongoDB ObjectId of the post

**Success Response (200):**
```json
{
  "_id": "64f1234567890abcdef12345",
  "userId": "user_abc123",
  "userName": "John Doe",
  "title": "Getting Started with React",
  "content": "Full post content...",
  "categories": [...],
  "tags": ["react", "javascript"],
  "status": "published",
  "comments": [
    {
      "_id": "64f1234567890abc",
      "userId": "user_xyz789",
      "userName": "Jane Smith",
      "content": "Great article!",
      "createdAt": "2025-10-15T11:00:00.000Z"
    }
  ],
  "likes": 15,
  "views": 235,
  "createdAt": "2025-10-15T10:30:00.000Z",
  "updatedAt": "2025-10-15T10:30:00.000Z"
}
```

**Error Responses:**
- `404`: Post not found
- `500`: Server error

---

#### Create New Post

Creates a new blog post.

**Endpoint:** `POST /api/posts`

**Authentication:** Required (JWT token)

**Request Body:**
```json
{
  "userId": "user_abc123",
  "userName": "John Doe",
  "userEmail": "john@example.com",
  "title": "My New Blog Post",
  "content": "This is the full content of my blog post...",
  "excerpt": "Optional short summary",
  "featuredImage": "",
  "categories": ["64f1234567890abc", "64f9876543210def"],
  "tags": ["javascript", "web-development"],
  "status": "published"
}
```

**Validation Rules:**
- `title`: 5-200 characters, required
- `content`: Minimum 10 characters, required
- `userId`, `userName`: Required
- `categories`: Array of valid category IDs
- `tags`: Array of strings
- `status`: One of: draft, published, archived

**Success Response (201):**
```json
{
  "_id": "64f1234567890abcdef12345",
  "userId": "user_abc123",
  "userName": "John Doe",
  "title": "My New Blog Post",
  "content": "This is the full content...",
  "excerpt": "Optional short summary",
  "categories": [...],
  "tags": ["javascript", "web-development"],
  "status": "published",
  "comments": [],
  "likes": 0,
  "views": 0,
  "createdAt": "2025-10-15T12:00:00.000Z",
  "updatedAt": "2025-10-15T12:00:00.000Z"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "userId": "user_abc123",
    "userName": "John Doe",
    "title": "My New Blog Post",
    "content": "This is the full content of my blog post...",
    "categories": ["64f1234567890abc"],
    "tags": ["javascript"],
    "status": "published"
  }'
```

---

#### Update Post

Updates an existing blog post.

**Endpoint:** `PUT /api/posts/:id`

**Authentication:** Required (JWT token)

**URL Parameters:**
- `id`: MongoDB ObjectId of the post

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content...",
  "excerpt": "Updated excerpt",
  "categories": ["64f1234567890abc"],
  "tags": ["updated-tag"],
  "status": "published"
}
```

**Note:** All fields are optional. Only provided fields will be updated.

**Success Response (200):**
```json
{
  "_id": "64f1234567890abcdef12345",
  "userId": "user_abc123",
  "userName": "John Doe",
  "title": "Updated Title",
  "content": "Updated content...",
  "categories": [...],
  "updatedAt": "2025-10-15T13:00:00.000Z"
}
```

**Error Responses:**
- `404`: Post not found
- `400`: Validation failed

---

#### Delete Post

Permanently deletes a blog post.

**Endpoint:** `DELETE /api/posts/:id`

**Authentication:** Required (JWT token)

**URL Parameters:**
- `id`: MongoDB ObjectId of the post

**Success Response (200):**
```json
{
  "ok": true,
  "message": "Post deleted successfully"
}
```

**Error Responses:**
- `404`: Post not found

**cURL Example:**
```bash
curl -X DELETE http://localhost:5000/api/posts/64f1234567890abcdef12345 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

#### Add Comment to Post

Adds a new comment to a blog post.

**Endpoint:** `POST /api/posts/:id/comments`

**Authentication:** Required (JWT token)

**URL Parameters:**
- `id`: MongoDB ObjectId of the post

**Request Body:**
```json
{
  "userId": "user_xyz789",
  "userName": "Jane Smith",
  "content": "Great article! Very helpful."
}
```

**Validation Rules:**
- `content`: 1-500 characters, required
- `userId`, `userName`: Required

**Success Response (201):**
```json
{
  "_id": "64f1234567890abcdef12345",
  "title": "Post Title",
  "comments": [
    {
      "_id": "64f9876543210def",
      "userId": "user_xyz789",
      "userName": "Jane Smith",
      "content": "Great article! Very helpful.",
      "createdAt": "2025-10-15T14:00:00.000Z"
    }
  ]
}
```

---

#### Delete Comment

Deletes a specific comment from a post.

**Endpoint:** `DELETE /api/posts/:id/comments/:commentId`

**Authentication:** Required (JWT token)

**URL Parameters:**
- `id`: MongoDB ObjectId of the post
- `commentId`: MongoDB ObjectId of the comment

**Success Response (200):**
```json
{
  "_id": "64f1234567890abcdef12345",
  "comments": []
}
```

---

#### Like Post

Increments the like count for a post.

**Endpoint:** `POST /api/posts/:id/like`

**Authentication:** Optional

**URL Parameters:**
- `id`: MongoDB ObjectId of the post

**Success Response (200):**
```json
{
  "_id": "64f1234567890abcdef12345",
  "likes": 16
}
```

---

### Categories Endpoints

#### Get All Categories

Retrieves all categories sorted alphabetically.

**Endpoint:** `GET /api/categories`

**Success Response (200):**
```json
[
  {
    "_id": "64f1234567890abc",
    "name": "Technology",
    "slug": "technology",
    "description": "Tech articles and tutorials",
    "color": "#3b82f6",
    "createdAt": "2025-10-10T10:00:00.000Z",
    "updatedAt": "2025-10-10T10:00:00.000Z"
  },
  {
    "_id": "64f9876543210def",
    "name": "Lifestyle",
    "slug": "lifestyle",
    "description": "Life and wellness content",
    "color": "#ec4899",
    "createdAt": "2025-10-10T10:05:00.000Z",
    "updatedAt": "2025-10-10T10:05:00.000Z"
  }
]
```

---

#### Get Single Category

Retrieves a specific category by ID.

**Endpoint:** `GET /api/categories/:id`

**Success Response (200):**
```json
{
  "_id": "64f1234567890abc",
  "name": "Technology",
  "slug": "technology",
  "description": "Tech articles and tutorials",
  "color": "#3b82f6"
}
```

---

#### Create Category

Creates a new category.

**Endpoint:** `POST /api/categories`

**Request Body:**
```json
{
  "name": "Technology",
  "description": "Tech articles and tutorials",
  "color": "#3b82f6"
}
```

**Validation Rules:**
- `name`: 2-50 characters, required, unique
- `description`: Optional
- `color`: Valid hex color (e.g., #3b82f6), optional

**Success Response (201):**
```json
{
  "_id": "64f1234567890abc",
  "name": "Technology",
  "slug": "technology",
  "description": "Tech articles and tutorials",
  "color": "#3b82f6",
  "createdAt": "2025-10-15T15:00:00.000Z"
}
```

**Note:** The `slug` is automatically generated from the name.

---

#### Update Category

Updates an existing category.

**Endpoint:** `PUT /api/categories/:id`

**Request Body:**
```json
{
  "name": "Updated Name",
  "description": "Updated description",
  "color": "#10b981"
}
```

**Success Response (200):**
```json
{
  "_id": "64f1234567890abc",
  "name": "Updated Name",
  "slug": "updated-name",
  "description": "Updated description",
  "color": "#10b981"
}
```

---

#### Delete Category

Permanently deletes a category.

**Endpoint:** `DELETE /api/categories/:id`

**Success Response (200):**
```json
{
  "ok": true,
  "message": "Category deleted successfully"
}
```

---

### API Error Codes

| Status Code | Meaning | Common Causes |
|-------------|---------|---------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Validation failed, invalid input |
| 401 | Unauthorized | Missing or invalid JWT token |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate entry (email, username) |
| 500 | Server Error | Database error, unexpected error |

---

## 🗄️ Database Schema

### User Model

```javascript
{
  username: String (required, unique, 3-30 chars),
  email: String (required, unique, lowercase),
  password: String (required, hashed with bcrypt),
  firstName: String,
  lastName: String,
  bio: String,
  avatar: String (URL),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `email`: Unique index
- `username`: Unique index

---

### Post Model

```javascript
{
  userId: String (required, indexed),
  userEmail: String,
  userName: String (required),
  title: String (required, 5-200 chars),
  content: String (required, min 10 chars),
  excerpt: String (auto-generated if empty),
  featuredImage: String (URL),
  categories: [ObjectId] (ref: Category),
  tags: [String],
  status: String (enum: draft/published/archived),
  comments: [{
    userId: String,
    userName: String,
    content: String,
    createdAt: Date
  }],
  likes: Number (default: 0),
  views: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `userId + createdAt`: Compound index
- `status + createdAt`: Compound index
- `categories`: Index
- `title + content + tags`: Text search index

---

### Category Model

```javascript
{
  name: String (required, unique, 2-50 chars),
  slug: String (required, unique, auto-generated),
  description: String,
  color: String (hex color, default: #6366f1),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `name`: Unique index
- `slug`: Unique index

---

## 🎨 Frontend Architecture

### Component Hierarchy

```
App
├── Header (Navigation + Auth)
│   ├── Navigation Links
│   ├── SignInButton (Clerk)
│   └── UserButton (Clerk)
│
├── Routes
│   ├── AllPosts (Public)
│   │   ├── SearchBar
│   │   ├── CategoryFilter
│   │   ├── PostCard (multiple)
│   │   └── Pagination
│   │
│   ├── PostDetail (Public)
│   │   ├── PostContent
│   │   ├── EngagementMetrics
│   │   ├── CommentSection
│   │   └── CommentForm
│   │
│   ├── Dashboard (Protected)
│   │   ├── NewPostDialog
│   │   ├── SearchBar
│   │   ├── CategoryFilter
│   │   ├── PostCard (with actions)
│   │   └── Pagination
│   │
│   └── Categories (Protected)
│       └── CategoryManager
│           ├── CreateCategoryForm
│           └── CategoryList
│
└── Footer
```

### State Management

The app uses React hooks for state management:

- **`useState`** - Local component state
- **`useEffect`** - Side effects and data fetching
- **`useUser`** (Clerk) - Current user data
- **Custom hooks** - Reusable logic (API calls)

### Routing

React Router DOM handles navigation:

| Route | Component | Access |
|-------|-----------|--------|
| `/` | AllPosts | Public |
| `/post/:id` | PostDetail | Public |
| `/my-posts` | Dashboard | Protected |
| `/categories` | Categories | Protected |

### API Integration

The `lib/api.js` file provides a clean interface:

```javascript
// Example usage in components
import { PostsAPI } from '@/lib/api';

// Fetch posts
const posts = await PostsAPI.list({ page: 1, limit: 10 });

// Create post
const newPost = await PostsAPI.create(postData);

// Update post
const updated = await PostsAPI.update(postId, updateData);
```

---

## 🧪 Testing Guide

### Manual Testing Checklist

#### Authentication Tests
- [ ] Register new user with valid data
- [ ] Register with duplicate email (should fail)
- [ ] Register with invalid email format (should fail)
- [ ] Login with correct credentials
- [ ] Login with wrong password (should fail)
- [ ] Logout functionality

#### Post Management Tests
- [ ] Create new post with all fields
- [ ] Create post with only required fields
- [ ] Create post with categories
- [ ] Create post with tags
- [ ] Edit existing post
- [ ] Delete post (with confirmation)
- [ ] View post details
- [ ] Post view count increments

#### Search & Filter Tests
- [ ] Search posts by title
- [ ] Search posts by content
- [ ] Search posts by tags
- [ ] Filter by category
- [ ] Filter by status
- [ ] Combine search and filters
- [ ] Clear filters

#### Pagination Tests
- [ ] Navigate to next page
- [ ] Navigate to previous page
- [ ] Page numbers display correctly
- [ ] Results per page limit works

#### Comments Tests
- [ ] Add comment to post
- [ ] View all comments
- [ ] Delete own comment
- [ ] Comment count updates

#### Category Management Tests
- [ ] Create new category
- [ ] View all categories
- [ ] Update category
- [ ] Delete category
- [ ] Category appears in post filters

#### UI/UX Tests
- [ ] Responsive design on mobile
- [ ] Loading states display
- [ ] Error messages show
- [ ] Success notifications appear
- [ ] Forms validate input

### API Testing with cURL

Test API endpoints directly:

```bash
# Test server is running
curl http://localhost:5000

# Get all posts
curl http://localhost:5000/api/posts

# Get posts with search
curl "http://localhost:5000/api/posts?search=react&limit=5"

# Create category
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name":"Testing","color":"#ff0000"}'
```

### API Testing with Postman

1. Import the API collection (create one based on docs)
2. Set environment variables:
   - `BASE_URL`: http://localhost:5000
   - `JWT_TOKEN`: (from login response)
3. Test each endpoint systematically

---

## 🚀 Deployment

### Backend Deployment (Railway/Render)

#### Railway Deployment

1. **Sign up** at [railway.app](https://railway.app)
2. **Create new project** → "Deploy from GitHub repo"
3. **Select your repository**
4. **Configure environment variables**:
   - Add all variables from `.env`
   - Set `NODE_ENV=production`
5. **Deploy**

**Railway Advantages:**
- Free tier available
- Automatic HTTPS
- MongoDB integration
- GitHub auto-deploy

#### Render Deployment

1. **Sign up** at [render.com](https://render.com)
2. **New Web Service** → Connect repository
3. **Configure:**
   - Build command: `cd backend && npm install`
   - Start command: `cd backend && npm start`
4. **Add environment variables**
5. **Deploy**

### Frontend Deployment (Vercel)

1. **Sign up** at [vercel.com](https://vercel.com)
2. **Import project** from GitHub
3. **Configure:**
   - Framework: Vite
   - Root directory: `frontend`
   - Build command: `npm run build`
   - Output directory: `dist`
4. **Environment variables:**
   - `VITE_API_URL`: Your backend URL
   - `VITE_CLERK_PUBLISHABLE_KEY`: Clerk key
5. **Deploy**

### Database Deployment (MongoDB Atlas)

Already covered in Configuration section. Use Atlas connection string in production.

### Post-Deployment Checklist

- [ ] Backend is accessible via HTTPS
- [ ] Frontend is accessible via HTTPS
- [ ] Database connection works
- [ ] Environment variables are set
- [ ] CORS allows frontend origin
- [ ] API endpoints respond correctly
- [ ] Authentication works
- [ ] Seed sample data (optional)

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Issue: MongoDB Connection Failed

**Error:** `MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017`

**Solutions:**
```bash
# Check if MongoDB is running
pgrep mongod

# Start MongoDB
# macOS:
brew services start mongodb-community

# Linux:
sudo systemctl start mongod

# Windows:
net start MongoDB

# Verify connection
mongosh
```

---

#### Issue: Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solutions:**
```bash
# Find process using port 5000
lsof -i :5000
# Or on Windows:
netstat -ano | findstr :5000

# Kill the process (macOS/Linux)
kill -9 <PID>

# Or change port in backend/.env
PORT=5001
```

---

#### Issue: Clerk Authentication Not Working

**Error:** `Missing Clerk Publishable Key`

**Solutions:**
1. Verify `VITE_CLERK_PUBLISHABLE_KEY` is set in `frontend/.env`
2. Restart frontend server after adding key
3. Clear browser cache and cookies
4. Check Clerk dashboard for correct key
5. Verify key starts with `pk_test_` or `pk_live_`

---

#### Issue: API Requests Failing with CORS Error

**Error:** `Access to fetch at 'http://localhost:5000' has been blocked by CORS policy`

**Solutions:**
1. Check `ALLOWED_ORIGIN` in `backend/.env` matches frontend URL
2. Restart backend server
3. Verify CORS middleware is configured in `server.js`
4. Check browser console for exact error

---

#### Issue: Cannot POST/PUT/DELETE

**Error:** `404 Not Found` or `Cannot POST /api/posts`

**Solutions:**
1. Verify backend server is running
2. Check API endpoint URL is correct
3. Ensure `Content-Type: application/json` header is set
4. Check backend console for errors
5. Verify route is registered in `server.js`

---

#### Issue: JWT Token Invalid

**Error:** `Token is not valid` or `401 Unauthorized`

**Solutions:**
1. Check token is included in Authorization header
2. Format: `Authorization: Bearer YOUR_TOKEN`
3. Verify `JWT_SECRET` matches between environments
4. Check token hasn't expired
5. Generate new token by logging in again

---

#### Issue: Database Seed Fails

**Error:** `Cannot read property '_id' of null`

**Solutions:**
```bash
# Clear existing data first
mongosh
use blog-app
db.dropDatabase()
exit

# Run seed again
npm run seed
```

---

#### Issue: Frontend Build Fails

**Error:** `Error: Could not resolve "@/lib/utils"`

**Solutions:**
1. Verify `jsconfig.json` is configured
2. Check `vite.config.js` path alias
3. Restart VS Code
4. Delete `node_modules` and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

#### Issue: Styles Not Loading

**Error:** Tailwind styles not appearing

**Solutions:**
1. Verify `@import "tailwindcss";` in `index.css`
2. Check `tailwind.config.js` exists
3. Restart Vite dev server
4. Clear browser cache
5. Check Tailwind CDN is not being used

---

### Debug Mode

Enable detailed logging:

**Backend:**
```javascript
// In server.js, add:
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});
```

**Frontend:**
```javascript
// In api.js, add:
axios.interceptors.request.use(config => {
  console.log('Request:', config);
  return config;
});

axios.interceptors.response.use(
  response => {
    console.log('Response:', response);
    return response;
  },
  error => {
    console.error('Error:', error.response);
    return Promise.reject(error);
  }
);
```

---

## ✅ Assignment Completion

### Task 1: Project Setup ✅

**Requirements:**
- [x] Clear directory structure for client and server
- [x] MongoDB connection using Mongoose
- [x] Express.js server with necessary middleware
- [x] React frontend using Vite
- [x] Proxy configuration for API calls
- [x] Environment variables for configuration

**Evidence:**
- Backend organized in `src/` with clear separation
- `config/db.js` handles MongoDB connection
- `server.js` configured with CORS, JSON parsing
- Vite configuration includes proxy setup
- `.env` files for both backend and frontend

---

### Task 2: Back-End Development ✅

**Requirements:**
- [x] RESTful API with all CRUD endpoints
- [x] Mongoose models with relationships
- [x] Input validation (express-validator)
- [x] Error handling middleware

**Evidence:**
- **Posts API**: GET, POST, PUT, DELETE implemented
- **Categories API**: Full CRUD operations
- **Auth API**: Registration and login
- **Models**: User.js, Post.js, Category.js with proper schemas
- **Validation**: `validators.js` with comprehensive rules
- **Error Handler**: `errorHandler.js` catches all errors

---

### Task 3: Front-End Development ✅

**Requirements:**
- [x] Post list view component
- [x] Single post view component
- [x] Create/edit post form
- [x] Navigation and layout
- [x] React Router for navigation
- [x] React hooks (useState, useEffect, custom hooks)

**Evidence:**
- **Components**: PostCard, PostDetail, NewPostDialog
- **Pages**: Dashboard, AllPosts, PostDetail, Categories
- **Routing**: App.jsx with React Router
- **Hooks**: Extensive use of hooks throughout
- **Custom Hook**: API calls abstracted in `lib/api.js`

---

### Task 4: Integration and Data Flow ✅

**Requirements:**
- [x] API service for backend communication
- [x] State management for posts and categories
- [x] Forms with validation
- [x] Optimistic UI updates
- [x] Loading and error states

**Evidence:**
- **API Service**: `lib/api.js` handles all API calls
- **State Management**: useState for local state
- **Validation**: Client-side and server-side validation
- **Optimistic Updates**: Posts update immediately in UI
- **Status Handling**: Loading spinners and error messages

---

### Task 5: Advanced Features ✅

**All advanced features implemented:**

1. ✅ **User Authentication**
   - JWT-based registration and login
   - Password hashing with bcryptjs
   - Protected routes
   - Token middleware

2. ✅ **Image Uploads** (Prepared)
   - Multer configured for future use
   - File upload routes ready

3. ✅ **Pagination**
   - Backend supports page/limit
   - Frontend pagination controls
   - Page count display

4. ✅ **Search and Filtering**
   - Full-text search on title/content/tags
   - Category filtering
   - Status filtering
   - Combined filters

5. ✅ **Comments Feature**
   - Add comments to posts
   - Delete comments
   - Real-time comment count

---

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make changes**
4. **Test thoroughly**
5. **Commit with descriptive message**:
   ```bash
   git commit -m "Add: Amazing new feature"
   ```
6. **Push to branch**:
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open Pull Request**

### Code Style Guidelines

- Use ES6+ syntax
- Follow Airbnb style guide
- Add comments for complex logic
- Keep functions small and focused
- Use meaningful variable names

### Commit Message Format

```
Type: Brief description

- Detailed change 1
- Detailed change 2

Type: Add, Update, Fix, Remove, Refactor, Docs, Test
```

---

## 📝 License

This project is part of the **PLP MERN Stack Development Course - Week 4 Assignment**.

**Educational Use Only**

---

## 👥 Authors

- **Emanuel Mutua** - Initial work - [GitHub Profile](https://github.com/emutua23)

---

## 🙏 Acknowledgments

- **PLP Academy** - MERN Stack curriculum and guidance
- **Radix UI Team** - Accessible component primitives
- **Tailwind Labs** - Utility-first CSS framework
- **Clerk** - Authentication solution
- **MongoDB** - Database platform
- **Vercel** - Hosting platform
- **Open Source Community** - Various npm packages

---

## 📚 Additional Resources

### Official Documentation
- [MongoDB Docs](https://docs.mongodb.com/) - Database documentation
- [Express.js Guide](https://expressjs.com/en/guide/routing.html) - Express routing
- [React Docs](https://react.dev/) - React fundamentals
- [Node.js API](https://nodejs.org/api/) - Node.js reference
- [Tailwind CSS](https://tailwindcss.com/docs) - Styling reference
- [Clerk Docs](https://clerk.com/docs) - Authentication setup

### Learning Resources
- [MongoDB University](https://university.mongodb.com/) - Free MongoDB courses
- [React Tutorial](https://react.dev/learn) - Official React tutorial
- [Express.js Crash Course](https://www.youtube.com/watch?v=L72fhGm1tfE) - Video tutorial
- [REST API Best Practices](https://restfulapi.net/) - API design guide

### Tools & Extensions
- [MongoDB Compass](https://www.mongodb.com/products/compass) - Database GUI
- [Postman](https://www.postman.com/) - API testing
- [VS Code](https://code.visualstudio.com/) - Code editor
- [React DevTools](https://react.dev/learn/react-developer-tools) - React debugging

---

## 📞 Support

Need help? Here's how to get support:

1. **Check Documentation** - This README and QUICKSTART.md
2. **Review Issues** - Check GitHub Issues for similar problems
3. **Ask Questions** - Create a new issue with details
4. **Contact Instructor** - For course-related questions

---

## 🎯 What's Next?

After completing this project, consider:

1. **Add Features**:
   - User profiles with avatars
   - Rich text editor (TinyMCE/Quill)
   - Image upload for posts
   - Email notifications
   - Social sharing buttons
   - Post bookmarking
   - User following system

2. **Improve Performance**:
   - Implement caching (Redis)
   - Optimize database queries
   - Add CDN for assets
   - Implement lazy loading

3. **Enhance Security**:
   - Rate limiting
   - Input sanitization
   - HTTPS enforcement
   - Security headers

4. **Deploy to Production**:
   - Set up CI/CD pipeline
   - Configure monitoring
   - Add error tracking (Sentry)
   - Set up analytics

5. **Add Testing**:
   - Unit tests (Jest)
   - Integration tests (Supertest)
   - E2E tests (Playwright)
   - Component tests (React Testing Library)

---

**Happy Coding! 🚀**

*Built with ❤️ using the MERN Stack*

---

**Last Updated:** October 2025  
**Version:** 2.0.0 (Enhanced Edition)  
**Maintainer:** [Emanuel Mutua](mailto:emanuel.mutua@gmail.com)
