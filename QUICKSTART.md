# Quick Start Guide - MERN Blog App

## 🚀 Quick Setup (5 Minutes)

### Step 1: Prerequisites Check
```bash
# Check Node.js version (needs v18+)
node --version

# Check if MongoDB is installed
mongod --version
```

### Step 2: Clone and Install

```bash
# Navigate to project
cd mern-stack-integration-emutua23

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 3: Configure Environment Variables

**Backend** (`backend/.env`):
```env
MONGODB_URI=mongodb://localhost:27017/blog-app
PORT=5000
ALLOWED_ORIGIN=http://localhost:5173
JWT_SECRET=your_secret_key_here
JWT_EXPIRATION=7d
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
```

### Step 4: Get Clerk API Key (2 minutes)

1. Visit [clerk.com](https://clerk.com) and sign up
2. Create a new application
3. Copy the **Publishable Key** from the dashboard
4. Paste it in `frontend/.env`

### Step 5: Start MongoDB

```bash
# Option 1: Local MongoDB
mongod

# Option 2: Use MongoDB Atlas (cloud)
# Just update MONGODB_URI in backend/.env with your Atlas connection string
```

### Step 6: Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 7: Access the App

Open browser: **http://localhost:5173**

## 🎯 First Time Usage

1. **Sign In** - Click "Sign In" button in the header
2. **Create Category** - Go to "Categories" and create your first category (e.g., "Technology", "Lifestyle")
3. **Create Post** - Go to "My Posts" and click "New Post"
4. **Explore** - View all posts on the home page
5. **Interact** - Click on any post to view details, add comments, and like

## 📋 Testing the Features

### Test CRUD Operations
```bash
# All operations can be tested via the UI:
1. CREATE: Click "New Post" button
2. READ: View posts on home page or "My Posts"
3. UPDATE: Click "Edit" button on your post
4. DELETE: Click "Delete" button on your post
```

### Test Authentication
```bash
1. Sign up with a new account
2. Sign in with existing credentials
3. Access protected routes (My Posts, Categories)
4. Sign out and verify access is restricted
```

### Test Search & Filter
```bash
1. Go to "All Posts" or "My Posts"
2. Enter search term in search box
3. Select category from dropdown
4. Verify filtered results
```

### Test Pagination
```bash
1. Create more than 10 posts
2. Navigate using "Previous" and "Next" buttons
3. Verify page numbers and counts
```

### Test Comments
```bash
1. Open any post detail page
2. Add a comment
3. Delete your comment
4. Verify comment count updates
```

## 🔧 Common Commands

```bash
# Backend
npm run dev          # Start development server with nodemon
npm start            # Start production server

# Frontend  
npm run dev          # Start Vite development server
npm run build        # Build for production
npm run preview      # Preview production build

# Both
npm install          # Install dependencies
```

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000

# Check MongoDB connection
mongo --eval "db.stats()"
```

### Frontend won't start
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS errors
- Verify `ALLOWED_ORIGIN` in backend `.env` matches frontend URL
- Restart backend server after changing `.env`

### Clerk authentication not working
- Verify `VITE_CLERK_PUBLISHABLE_KEY` is set correctly
- Check Clerk dashboard for correct key
- Restart frontend after changing `.env`

## 📚 API Testing with cURL

### Create a post
```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Post",
    "content": "This is a test post content.",
    "userId": "user_123",
    "userName": "Test User"
  }'
```

### Get all posts
```bash
curl http://localhost:5000/api/posts
```

### Search posts
```bash
curl "http://localhost:5000/api/posts?search=test&page=1&limit=10"
```

### Create a category
```bash
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Technology",
    "description": "Tech related posts",
    "color": "#3b82f6"
  }'
```

## 🎓 Learning Checklist

- [ ] Understand MongoDB schema design (User, Post, Category models)
- [ ] Learn Express.js routing and middleware
- [ ] Practice React hooks (useState, useEffect)
- [ ] Implement React Router for navigation
- [ ] Master API integration with Axios
- [ ] Apply form validation (client & server side)
- [ ] Handle authentication with JWT
- [ ] Implement search and pagination
- [ ] Style with Tailwind CSS
- [ ] Deploy to production (optional)

## 🚀 Next Steps

1. **Extend Features:**
   - Add image upload for featured images
   - Implement rich text editor
   - Add user profiles
   - Create post drafts autosave

2. **Improve UI:**
   - Add animations and transitions
   - Improve mobile responsiveness
   - Add dark mode

3. **Deploy:**
   - Backend: Railway, Render, or Heroku
   - Frontend: Vercel, Netlify, or Cloudflare Pages
   - Database: MongoDB Atlas

4. **Add Testing:**
   - Unit tests with Jest
   - Integration tests with Supertest
   - E2E tests with Playwright

---

**Need Help?** Check the main [README.md](./README.md) for detailed documentation!
