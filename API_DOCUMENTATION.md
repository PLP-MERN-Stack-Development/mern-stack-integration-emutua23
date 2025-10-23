# API Documentation - MERN Blog App

Complete API reference for the MERN Blog Application backend.

## Table of Contents

- [Overview](#overview)
- [Base URL](#base-url)
- [Authentication](#authentication)
- [Response Format](#response-format)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Endpoints](#endpoints)
  - [Authentication](#authentication-endpoints)
  - [Posts](#posts-endpoints)
  - [Categories](#categories-endpoints)
- [Postman Collection](#postman-collection)
- [cURL Examples](#curl-examples)

---

## Overview

The Blog API is a RESTful API built with Express.js and MongoDB. It provides endpoints for:
- User authentication (register/login)
- Blog post management (CRUD operations)
- Category management
- Comments on posts
- Post engagement (likes, views)
- Search and filtering capabilities

**Version:** 1.0.0  
**Protocol:** HTTP/HTTPS  
**Data Format:** JSON

---

## Base URL

### Development
```
http://localhost:5000/api
```

### Production
```
https://your-app.railway.app/api
```

All endpoints are prefixed with `/api`.

---

## Authentication

### JWT Token Authentication

The API uses JWT (JSON Web Tokens) for authentication. Some endpoints require authentication.

**How to authenticate:**

1. **Register or Login** to get a JWT token
2. **Include the token** in the Authorization header for protected routes

**Header Format:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**Token Expiration:** 7 days (configurable)

**Example:**
```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  http://localhost:5000/api/posts
```

---

## Response Format

All API responses follow a consistent JSON structure.

### Success Response

```json
{
  "data": { ... },
  "message": "Success message",
  "status": 200
}
```

### List Response with Pagination

```json
{
  "posts": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pages": 5
  }
}
```

### Error Response

```json
{
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ],
  "status": 400
}
```

---

## Error Handling

### HTTP Status Codes

| Code | Status | Description |
|------|--------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request data or validation error |
| 401 | Unauthorized | Missing or invalid authentication token |
| 403 | Forbidden | Authenticated but not authorized |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Duplicate resource (e.g., email already exists) |
| 422 | Unprocessable Entity | Validation failed |
| 500 | Internal Server Error | Server-side error |

### Common Error Messages

```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "title",
      "message": "Title must be between 5 and 200 characters"
    }
  ]
}
```

```json
{
  "message": "Authentication failed",
  "error": "Invalid token"
}
```

```json
{
  "message": "Resource not found",
  "error": "Post with ID 64f123... does not exist"
}
```

---

## Rate Limiting

**Not currently implemented** but recommended for production:

- Rate limit: 100 requests per 15 minutes per IP
- Burst limit: 10 requests per second
- Response headers:
  - `X-RateLimit-Limit`: Request limit
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Time when limit resets

---

## Endpoints

---

## Authentication Endpoints

### Register New User

Create a new user account.

**Endpoint:** `POST /api/auth/register`

**Authentication:** Not required

**Request Headers:**
```
Content-Type: application/json
```

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

**Field Validations:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| username | string | Yes | 3-30 characters, alphanumeric + underscore, unique |
| email | string | Yes | Valid email format, unique |
| password | string | Yes | Minimum 6 characters |
| firstName | string | No | - |
| lastName | string | No | - |

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGYxMjM0NTY3ODkwYWJjZGVmMTIzNDUiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJpYXQiOjE2OTM1MTIwMDAsImV4cCI6MTY5NDExNjgwMH0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
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

**400 - Validation Failed:**
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Must be a valid email address"
    }
  ]
}
```

**400 - Email Already Exists:**
```json
{
  "message": "Email already registered"
}
```

**400 - Username Taken:**
```json
{
  "message": "Username already taken"
}
```

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

**JavaScript Example:**
```javascript
const response = await fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'johndoe',
    email: 'john@example.com',
    password: 'SecurePass123!',
    firstName: 'John',
    lastName: 'Doe'
  })
});

const data = await response.json();
console.log(data.token); // Save this token
```

---

### Login User

Authenticate existing user and get JWT token.

**Endpoint:** `POST /api/auth/login`

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Field Validations:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| email | string | Yes | Valid email format |
| password | string | Yes | - |

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

**401 - Invalid Credentials:**
```json
{
  "message": "Invalid email or password"
}
```

**400 - Validation Failed:**
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

**Using the Token:**

After successful login, include the token in subsequent requests:

```bash
export TOKEN="your_jwt_token_here"

curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/posts
```

---

## Posts Endpoints

### Get All Posts

Retrieve a paginated list of posts with optional filtering and search.

**Endpoint:** `GET /api/posts`

**Authentication:** Optional

**Query Parameters:**

| Parameter | Type | Default | Description | Example |
|-----------|------|---------|-------------|---------|
| page | integer | 1 | Page number (min: 1) | ?page=2 |
| limit | integer | 10 | Posts per page (min: 1, max: 100) | ?limit=20 |
| userId | string | - | Filter by post author | ?userId=user_123 |
| category | string | - | Filter by category ID | ?category=64f123... |
| status | string | - | Filter by status (draft/published/archived) | ?status=published |
| search | string | - | Full-text search query | ?search=react |

**Multiple Parameters:**
```
GET /api/posts?page=2&limit=5&category=64f123&search=javascript
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
      "content": "React is a powerful JavaScript library for building user interfaces. In this comprehensive guide, we'll explore the fundamentals of React...",
      "excerpt": "Learn React basics and start building modern web applications...",
      "featuredImage": "",
      "categories": [
        {
          "_id": "64f1234567890abc",
          "name": "Technology",
          "slug": "technology",
          "color": "#3b82f6"
        }
      ],
      "tags": ["react", "javascript", "tutorial", "web-development"],
      "status": "published",
      "comments": [
        {
          "_id": "64f9876543210def",
          "userId": "user_xyz789",
          "userName": "Jane Smith",
          "content": "Great article! Very helpful for beginners.",
          "createdAt": "2025-10-15T11:00:00.000Z"
        }
      ],
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

**Empty Result:**
```json
{
  "posts": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 0,
    "pages": 0
  }
}
```

**cURL Examples:**

```bash
# Get all posts (default pagination)
curl http://localhost:5000/api/posts

# Get second page with 20 posts per page
curl "http://localhost:5000/api/posts?page=2&limit=20"

# Search for posts containing "react"
curl "http://localhost:5000/api/posts?search=react"

# Filter by category and status
curl "http://localhost:5000/api/posts?category=64f123&status=published"

# Get user's own posts
curl "http://localhost:5000/api/posts?userId=user_abc123"

# Combine multiple filters
curl "http://localhost:5000/api/posts?search=javascript&category=64f123&limit=5"
```

---

### Get Single Post

Retrieve a specific post by ID. **Automatically increments view count.**

**Endpoint:** `GET /api/posts/:id`

**Authentication:** Optional

**URL Parameters:**
- `id` (string, required): MongoDB ObjectId of the post

**Success Response (200):**
```json
{
  "_id": "64f1234567890abcdef12345",
  "userId": "user_abc123",
  "userName": "John Doe",
  "userEmail": "john@example.com",
  "title": "Getting Started with React",
  "content": "Full post content here... This can be very long text with detailed information about the topic...",
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
  "comments": [
    {
      "_id": "64f9876543210def",
      "userId": "user_xyz789",
      "userName": "Jane Smith",
      "content": "Great article!",
      "createdAt": "2025-10-15T11:00:00.000Z"
    }
  ],
  "likes": 15,
  "views": 235,
  "createdAt": "2025-10-15T10:30:00.000Z",
  "updatedAt": "2025-10-15T14:00:00.000Z"
}
```

**Error Responses:**

**404 - Not Found:**
```json
{
  "message": "Post not found"
}
```

**500 - Invalid ID Format:**
```json
{
  "message": "Cast to ObjectId failed for value \"invalid-id\""
}
```

**cURL Example:**
```bash
curl http://localhost:5000/api/posts/64f1234567890abcdef12345
```

---

### Create New Post

Create a new blog post.

**Endpoint:** `POST /api/posts`

**Authentication:** Required (JWT token)

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN
```

**Request Body:**
```json
{
  "userId": "user_abc123",
  "userName": "John Doe",
  "userEmail": "john@example.com",
  "title": "My New Blog Post",
  "content": "This is the full content of my blog post. It contains detailed information about the topic I'm writing about...",
  "excerpt": "Optional short summary of the post",
  "featuredImage": "https://example.com/image.jpg",
  "categories": ["64f1234567890abc", "64f9876543210def"],
  "tags": ["javascript", "web-development", "tutorial"],
  "status": "published"
}
```

**Field Validations:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| userId | string | Yes | - |
| userName | string | Yes | - |
| userEmail | string | No | Valid email format |
| title | string | Yes | 5-200 characters |
| content | string | Yes | Minimum 10 characters |
| excerpt | string | No | Auto-generated from content if empty |
| featuredImage | string (URL) | No | Valid URL format |
| categories | array of ObjectIds | No | Valid category IDs |
| tags | array of strings | No | - |
| status | string | No | One of: draft, published, archived (default: published) |

**Success Response (201):**
```json
{
  "_id": "64f1234567890abcdef12345",
  "userId": "user_abc123",
  "userName": "John Doe",
  "userEmail": "john@example.com",
  "title": "My New Blog Post",
  "content": "This is the full content...",
  "excerpt": "Optional short summary of the post",
  "featuredImage": "https://example.com/image.jpg",
  "categories": [
    {
      "_id": "64f1234567890abc",
      "name": "Technology",
      "slug": "technology",
      "color": "#3b82f6"
    }
  ],
  "tags": ["javascript", "web-development", "tutorial"],
  "status": "published",
  "comments": [],
  "likes": 0,
  "views": 0,
  "createdAt": "2025-10-15T12:00:00.000Z",
  "updatedAt": "2025-10-15T12:00:00.000Z"
}
```

**Error Responses:**

**400 - Validation Failed:**
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "title",
      "message": "Title must be between 5 and 200 characters"
    },
    {
      "field": "content",
      "message": "Content must be at least 10 characters"
    }
  ]
}
```

**400 - Missing Required Fields:**
```json
{
  "message": "User information is required"
}
```

**401 - Unauthorized:**
```json
{
  "message": "No authentication token, access denied"
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
    "content": "This is the full content of my blog post with lots of interesting information...",
    "categories": ["64f1234567890abc"],
    "tags": ["javascript", "tutorial"],
    "status": "published"
  }'
```

---

### Update Post

Update an existing blog post.

**Endpoint:** `PUT /api/posts/:id`

**Authentication:** Required (JWT token)

**URL Parameters:**
- `id` (string, required): MongoDB ObjectId of the post

**Request Body:**

All fields are optional. Only provided fields will be updated.

```json
{
  "title": "Updated Title",
  "content": "Updated content with new information...",
  "excerpt": "Updated excerpt",
  "featuredImage": "https://example.com/new-image.jpg",
  "categories": ["64f1234567890abc"],
  "tags": ["updated-tag", "new-tag"],
  "status": "published"
}
```

**Success Response (200):**
```json
{
  "_id": "64f1234567890abcdef12345",
  "userId": "user_abc123",
  "userName": "John Doe",
  "title": "Updated Title",
  "content": "Updated content...",
  "categories": [...],
  "tags": ["updated-tag", "new-tag"],
  "updatedAt": "2025-10-15T13:00:00.000Z"
}
```

**Error Responses:**

**404 - Post Not Found:**
```json
{
  "message": "Post not found"
}
```

**400 - Validation Failed:**
```json
{
  "message": "Validation failed",
  "errors": [...]
}
```

**cURL Example:**
```bash
curl -X PUT http://localhost:5000/api/posts/64f1234567890abcdef12345 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Updated Title",
    "content": "This is the updated content..."
  }'
```

---

### Delete Post

Permanently delete a blog post.

**Endpoint:** `DELETE /api/posts/:id`

**Authentication:** Required (JWT token)

**URL Parameters:**
- `id` (string, required): MongoDB ObjectId of the post

**Success Response (200):**
```json
{
  "ok": true,
  "message": "Post deleted successfully"
}
```

**Error Responses:**

**404 - Post Not Found:**
```json
{
  "message": "Post not found"
}
```

**401 - Unauthorized:**
```json
{
  "message": "Token is not valid"
}
```

**cURL Example:**
```bash
curl -X DELETE http://localhost:5000/api/posts/64f1234567890abcdef12345 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### Add Comment to Post

Add a new comment to a blog post.

**Endpoint:** `POST /api/posts/:id/comments`

**Authentication:** Required (JWT token)

**URL Parameters:**
- `id` (string, required): MongoDB ObjectId of the post

**Request Body:**
```json
{
  "userId": "user_xyz789",
  "userName": "Jane Smith",
  "content": "Great article! Very helpful and informative."
}
```

**Field Validations:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| userId | string | Yes | - |
| userName | string | Yes | - |
| content | string | Yes | 1-500 characters |

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
      "content": "Great article! Very helpful and informative.",
      "createdAt": "2025-10-15T14:00:00.000Z"
    }
  ]
}
```

**Error Responses:**

**404 - Post Not Found:**
```json
{
  "message": "Post not found"
}
```

**400 - Validation Failed:**
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "content",
      "message": "Comment must be between 1 and 500 characters"
    }
  ]
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:5000/api/posts/64f1234567890abcdef12345/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "userId": "user_xyz789",
    "userName": "Jane Smith",
    "content": "Great article!"
  }'
```

---

### Delete Comment

Delete a specific comment from a post.

**Endpoint:** `DELETE /api/posts/:id/comments/:commentId`

**Authentication:** Required (JWT token)

**URL Parameters:**
- `id` (string, required): MongoDB ObjectId of the post
- `commentId` (string, required): MongoDB ObjectId of the comment

**Success Response (200):**
```json
{
  "_id": "64f1234567890abcdef12345",
  "comments": []
}
```

**Error Responses:**

**404 - Post Not Found:**
```json
{
  "message": "Post not found"
}
```

**cURL Example:**
```bash
curl -X DELETE http://localhost:5000/api/posts/64f1234567890abcdef12345/comments/64f9876543210def \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### Like Post

Increment the like count for a post.

**Endpoint:** `POST /api/posts/:id/like`

**Authentication:** Optional

**URL Parameters:**
- `id` (string, required): MongoDB ObjectId of the post

**Note:** Currently implements simple increment. In production, should track users who liked to prevent multiple likes from same user.

**Success Response (200):**
```json
{
  "_id": "64f1234567890abcdef12345",
  "title": "Post Title",
  "likes": 16
}
```

**Error Responses:**

**404 - Post Not Found:**
```json
{
  "message": "Post not found"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:5000/api/posts/64f1234567890abcdef12345/like
```

---

## Categories Endpoints

### Category Slug Auto-Generation

All categories automatically generate URL-friendly slugs from their names during the validation phase. You **do not need to provide a slug** when creating or updating categories.

**Slug Generation Rules:**
- Converted to lowercase
- Non-alphanumeric characters removed (except hyphens)
- Spaces and special characters replaced with hyphens
- Multiple consecutive hyphens reduced to single hyphen
- Leading and trailing hyphens removed

**Examples:**

| Category Name | Generated Slug |
|--------------|----------------|
| Technology | technology |
| Home & Garden | home-garden |
| Health & Wellness | health-wellness |
| AI/ML Research | aiml-research |
| Food & Cooking | food-cooking |
| Travel Adventures | travel-adventures |

**Implementation:** The slug is auto-generated using a `pre-validate` hook in the Category model, ensuring it's always present, unique, and consistent before the document is saved to the database.

---

### Get All Categories

Retrieve all categories sorted alphabetically by name.

**Endpoint:** `GET /api/categories`

**Authentication:** Not required

**Success Response (200):**
```json
[
  {
    "_id": "64f1234567890abc",
    "name": "Technology",
    "slug": "technology",
    "description": "Tech articles, tutorials, and news",
    "color": "#3b82f6",
    "createdAt": "2025-10-10T10:00:00.000Z",
    "updatedAt": "2025-10-10T10:00:00.000Z"
  },
  {
    "_id": "64f9876543210def",
    "name": "Lifestyle",
    "slug": "lifestyle",
    "description": "Life, wellness, and personal development",
    "color": "#ec4899",
    "createdAt": "2025-10-10T10:05:00.000Z",
    "updatedAt": "2025-10-10T10:05:00.000Z"
  }
]
```

**Empty Result:**
```json
[]
```

**cURL Example:**
```bash
curl http://localhost:5000/api/categories
```

---

### Get Single Category

Retrieve a specific category by ID.

**Endpoint:** `GET /api/categories/:id`

**Authentication:** Not required

**URL Parameters:**
- `id` (string, required): MongoDB ObjectId of the category

**Success Response (200):**
```json
{
  "_id": "64f1234567890abc",
  "name": "Technology",
  "slug": "technology",
  "description": "Tech articles, tutorials, and news",
  "color": "#3b82f6",
  "createdAt": "2025-10-10T10:00:00.000Z",
  "updatedAt": "2025-10-10T10:00:00.000Z"
}
```

**Error Responses:**

**404 - Category Not Found:**
```json
{
  "message": "Category not found"
}
```

**cURL Example:**
```bash
curl http://localhost:5000/api/categories/64f1234567890abc
```

---

### Create Category

Create a new category. The slug will be automatically generated from the category name.

**Endpoint:** `POST /api/categories`

**Authentication:** Not required (Should be protected in production)

**Request Body:**
```json
{
  "name": "Technology",
  "description": "Tech articles, tutorials, and news",
  "color": "#3b82f6"
}
```

**Field Validations:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| name | string | Yes | 2-50 characters, unique |
| slug | string | No | **Auto-generated** from name (lowercase, hyphenated). You should NOT provide this field. |
| description | string | No | Maximum 500 characters |
| color | string | No | Valid hex color format (#RRGGBB), default: #6366f1 |

**Important Notes:**
- ⚡ **The `slug` field is automatically generated** from the `name` during validation
- 🚫 **Do NOT include `slug` in your request body** - it will be created automatically
- ✅ **Slugs are guaranteed to be unique** and URL-friendly
- 📝 **Examples:**
  - "Technology" → slug: "technology"
  - "Home & Garden" → slug: "home-garden"
  - "AI/ML Research" → slug: "aiml-research"

**Success Response (201):**
```json
{
  "_id": "64f1234567890abc",
  "name": "Technology",
  "slug": "technology",
  "description": "Tech articles, tutorials, and news",
  "color": "#3b82f6",
  "createdAt": "2025-10-15T15:00:00.000Z",
  "updatedAt": "2025-10-15T15:00:00.000Z"
}
```

**Error Responses:**

**400 - Validation Failed:**
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "name",
      "message": "Name must be between 2 and 50 characters"
    },
    {
      "field": "color",
      "message": "Color must be a valid hex color"
    }
  ]
}
```

**400 - Duplicate Category Name:**
```json
{
  "message": "Category validation failed: name: name already exists"
}
```

**400 - Duplicate Slug (rare, but possible):**
```json
{
  "message": "Category validation failed: slug: slug already exists"
}
```

**cURL Example:**
```bash
# Simple category creation
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Technology",
    "description": "Tech articles and tutorials",
    "color": "#3b82f6"
  }'

# Category with special characters (slug will be auto-cleaned)
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Home & Garden",
    "description": "Home improvement and gardening tips",
    "color": "#10b981"
  }'
# Response will include: "slug": "home-garden"
```

**JavaScript Example:**
```javascript
// Creating a category - notice no slug field needed
const response = await fetch('http://localhost:5000/api/categories', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Technology',
    description: 'Tech articles and tutorials',
    color: '#3b82f6'
    // NO slug field needed - it's auto-generated!
  })
});

const category = await response.json();
console.log(category.slug); // Output: "technology"
```

---

### Update Category

Update an existing category. If you update the name, the slug will be automatically regenerated to match.

**Endpoint:** `PUT /api/categories/:id`

**Authentication:** Not required (Should be protected in production)

**URL Parameters:**
- `id` (string, required): MongoDB ObjectId of the category

**Request Body:**

All fields are optional. Only provided fields will be updated.

```json
{
  "name": "Updated Name",
  "description": "Updated description",
  "color": "#10b981"
}
```

**Important Notes:**
- ⚡ **Updating the `name` automatically regenerates the `slug`** to match the new name
- 🚫 **Do NOT manually provide a `slug`** in the update - it will be auto-generated
- ✅ **The new slug will be unique** and URL-friendly
- 📝 **Example:** Changing name from "Technology" to "Tech & Innovation" will update slug from "technology" to "tech-innovation"

**Success Response (200):**
```json
{
  "_id": "64f1234567890abc",
  "name": "Updated Name",
  "slug": "updated-name",
  "description": "Updated description",
  "color": "#10b981",
  "createdAt": "2025-10-10T10:00:00.000Z",
  "updatedAt": "2025-10-15T16:00:00.000Z"
}
```

**Error Responses:**

**404 - Category Not Found:**
```json
{
  "message": "Category not found"
}
```

**400 - Validation Failed:**
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "name",
      "message": "Name must be between 2 and 50 characters"
    }
  ]
}
```

**400 - Duplicate Name:**
```json
{
  "message": "Category validation failed: name: name already exists"
}
```

**cURL Example:**
```bash
# Update category name (slug will auto-update)
curl -X PUT http://localhost:5000/api/categories/64f1234567890abc \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Advanced Technology",
    "color": "#10b981"
  }'
# Response slug will be: "advanced-technology"

# Update only description (slug stays the same)
curl -X PUT http://localhost:5000/api/categories/64f1234567890abc \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Updated tech content and tutorials"
  }'
```

**JavaScript Example:**
```javascript
// Update category name - slug auto-updates
const response = await fetch('http://localhost:5000/api/categories/64f1234567890abc', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Tech & Innovation'
    // Slug will automatically become "tech-innovation"
  })
});

const updated = await response.json();
console.log(updated.slug); // Output: "tech-innovation"
```

---

### Delete Category

Permanently delete a category.

**Endpoint:** `DELETE /api/categories/:id`

**Authentication:** Not required (Should be protected in production)

**URL Parameters:**
- `id` (string, required): MongoDB ObjectId of the category

**⚠️ Important Considerations:**

In production environments, you should:
- **Check for posts** using this category before deletion
- **Implement soft delete** instead of permanent deletion
- **Reassign posts** to a default "Uncategorized" category
- **Require admin authentication** for this operation
- **Log deletions** for audit purposes

**Success Response (200):**
```json
{
  "ok": true,
  "message": "Category deleted successfully"
}
```

**Error Responses:**

**404 - Category Not Found:**
```json
{
  "message": "Category not found"
}
```

**cURL Example:**
```bash
curl -X DELETE http://localhost:5000/api/categories/64f1234567890abc
```

---

### Complete Category Workflow Example

Here's a complete workflow showing category creation, retrieval, update, and deletion with automatic slug handling:

```bash
# 1. Create a new category
RESPONSE=$(curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Technology",
    "description": "Tech articles and tutorials",
    "color": "#3b82f6"
  }')

echo $RESPONSE
# Response: { "_id": "64f123...", "name": "Technology", "slug": "technology", ... }

# Extract category ID
CATEGORY_ID=$(echo $RESPONSE | jq -r '._id')
echo "Category ID: $CATEGORY_ID"
echo "Slug: technology (auto-generated)"

# 2. Get all categories
curl http://localhost:5000/api/categories

# 3. Get specific category
curl http://localhost:5000/api/categories/$CATEGORY_ID

# 4. Update category name (slug auto-updates)
curl -X PUT http://localhost:5000/api/categories/$CATEGORY_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Advanced Technology"
  }'
# Response slug will be: "advanced-technology"

# 5. Create another category with special characters
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Home & Garden",
    "description": "Home improvement tips",
    "color": "#10b981"
  }'
# Response slug will be: "home-garden"

# 6. Create category with numbers and spaces
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Web3 & Blockchain",
    "description": "Blockchain and Web3 content",
    "color": "#f59e0b"
  }'
# Response slug will be: "web3-blockchain"

# 7. Delete a category
curl -X DELETE http://localhost:5000/api/categories/$CATEGORY_ID
```

---

### Category API Quick Reference

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/categories` | GET | No | Get all categories (with slugs) |
| `/api/categories/:id` | GET | No | Get single category by ID |
| `/api/categories` | POST | No* | Create category (slug auto-generated) |
| `/api/categories/:id` | PUT | No* | Update category (slug auto-regenerated if name changes) |
| `/api/categories/:id` | DELETE | No* | Delete category |

**\*Should require authentication in production**

**Key Points:**
- ✅ Slugs are **always auto-generated** from category names
- ✅ You **never need to provide a slug** in requests
- ✅ Slugs are **automatically updated** when category names change
- ✅ All slugs are **guaranteed to be URL-friendly** and unique
- ✅ Slug format: lowercase, hyphenated, no special characters

---

## Postman Collection

### Import to Postman

1. Open Postman
2. Click "Import" button
3. Select "Raw text"
4. Paste this JSON:

```json
{
  "info": {
    "name": "MERN Blog API",
    "description": "API collection for MERN Blog Application",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:5000/api"
    },
    {
      "key": "token",
      "value": ""
    }
  ],
  "item": [
    {
      "name": "Authentication",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"username\": \"testuser\",\n  \"email\": \"test@example.com\",\n  \"password\": \"password123\",\n  \"firstName\": \"Test\",\n  \"lastName\": \"User\"\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{base_url}}/auth/register",
              "host": ["{{base_url}}"],
              "path": ["auth", "register"]
            }
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"test@example.com\",\n  \"password\": \"password123\"\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{base_url}}/auth/login",
              "host": ["{{base_url}}"],
              "path": ["auth", "login"]
            }
          }
        }
      ]
    },
    {
      "name": "Posts",
      "item": [
        {
          "name": "Get All Posts",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{base_url}}/posts?page=1&limit=10",
              "host": ["{{base_url}}"],
              "path": ["posts"],
              "query": [
                {
                  "key": "page",
                  "value": "1"
                },
                {
                  "key": "limit",
                  "value": "10"
                }
              ]
            }
          }
        },
        {
          "name": "Get Single Post",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{base_url}}/posts/:id",
              "host": ["{{base_url}}"],
              "path": ["posts", ":id"],
              "variable": [
                {
                  "key": "id",
                  "value": ""
                }
              ]
            }
          }
        },
        {
          "name": "Create Post",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"userId\": \"user_123\",\n  \"userName\": \"Test User\",\n  \"title\": \"Test Post\",\n  \"content\": \"This is test content\",\n  \"categories\": [],\n  \"tags\": [\"test\"],\n  \"status\": \"published\"\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{base_url}}/posts",
              "host": ["{{base_url}}"],
              "path": ["posts"]
            }
          }
        }
      ]
    },
    {
      "name": "Categories",
      "item": [
        {
          "name": "Get All Categories",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{base_url}}/categories",
              "host": ["{{base_url}}"],
              "path": ["categories"]
            }
          }
        },
        {
          "name": "Create Category",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Technology\",\n  \"description\": \"Tech articles\",\n  \"color\": \"#3b82f6\"\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{base_url}}/categories",
              "host": ["{{base_url}}"],
              "path": ["categories"]
            }
          }
        }
      ]
    }
  ]
}
```

### Environment Variables

Set these variables in Postman:

- `base_url`: `http://localhost:5000/api`
- `token`: (set after successful login)

---

## cURL Examples

### Complete Workflow Example

```bash
# 1. Register new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "SecurePass123!",
    "firstName": "John",
    "lastName": "Doe"
  }'

# Save the token from response
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# 2. Create a category
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Technology",
    "description": "Tech articles and tutorials",
    "color": "#3b82f6"
  }'

# Save the category ID from response
CATEGORY_ID="64f1234567890abc"

# 3. Create a blog post
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "userId": "user_abc123",
    "userName": "John Doe",
    "title": "Getting Started with React",
    "content": "React is a powerful JavaScript library...",
    "categories": ["'$CATEGORY_ID'"],
    "tags": ["react", "javascript"],
    "status": "published"
  }'

# Save the post ID from response
POST_ID="64f1234567890abcdef12345"

# 4. Add a comment
curl -X POST http://localhost:5000/api/posts/$POST_ID/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "userId": "user_xyz789",
    "userName": "Jane Smith",
    "content": "Great article!"
  }'

# 5. Like the post
curl -X POST http://localhost:5000/api/posts/$POST_ID/like

# 6. Get the post
curl http://localhost:5000/api/posts/$POST_ID

# 7. Search for posts
curl "http://localhost:5000/api/posts?search=react&limit=5"

# 8. Update the post
curl -X PUT http://localhost:5000/api/posts/$POST_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Updated: Getting Started with React"
  }'

# 9. Delete the post
curl -X DELETE http://localhost:5000/api/posts/$POST_ID \
  -H "Authorization: Bearer $TOKEN"
```

---

## Additional Notes

### Best Practices

1. **Always use HTTPS** in production
2. **Validate all input** on both client and server
3. **Implement rate limiting** to prevent abuse
4. **Log all API requests** for monitoring
5. **Version your API** (e.g., `/api/v1/posts`)
6. **Use pagination** for large datasets
7. **Cache responses** where appropriate
8. **Implement proper error handling**
9. **Document all changes** to the API
10. **Test endpoints** thoroughly before deployment

### Security Recommendations

- Use strong JWT secrets in production
- Implement refresh tokens for long-lived sessions
- Add request rate limiting
- Validate and sanitize all inputs
- Use HTTPS in production
- Implement CORS properly
- Add authentication to category endpoints
- Track user likes to prevent duplicate votes
- Implement soft deletes for important data

### Performance Tips

- Add database indexes for frequently queried fields
- Implement caching (Redis) for frequently accessed data
- Use compression middleware for responses
- Optimize database queries
- Implement pagination for all list endpoints
- Use CDN for static assets

---

**API Version:** 1.0.0  
**Last Updated:** October 2025  
**Maintainer:** [Emanuel Mutua](mailto:emanuel.mutua@gmail.com)