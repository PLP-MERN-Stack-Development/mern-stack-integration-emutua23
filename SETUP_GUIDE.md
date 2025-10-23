# Complete Setup Guide - MERN Blog App

Step-by-step instructions for setting up the MERN Blog Application from scratch.

## Table of Contents

- [Overview](#overview)
- [System Requirements](#system-requirements)
- [Installation Steps](#installation-steps)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Verification](#verification)
- [Seed Sample Data](#seed-sample-data)
- [Troubleshooting](#troubleshooting)
- [Next Steps](#next-steps)

---

## Overview

This guide will walk you through setting up the MERN Blog Application on your local machine. The entire process should take **15-20 minutes**.

**What you'll set up:**
- MongoDB database (local or cloud)
- Backend API server (Node.js + Express)
- Frontend React application (Vite)
- Authentication (Clerk)

---

## System Requirements

### Hardware Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| RAM | 4 GB | 8 GB or more |
| Storage | 2 GB free space | 5 GB free space |
| Processor | Dual-core | Quad-core or better |
| Internet | Required for installation | Broadband recommended |

### Software Requirements

#### Required Software

1. **Node.js** (v18.0.0 or higher)
   - Download: [nodejs.org](https://nodejs.org/)
   - Includes npm (Node Package Manager)
   - Verify installation: `node --version && npm --version`

2. **MongoDB** (v6.0.0 or higher)
   - **Option A:** Local installation from [mongodb.com](https://www.mongodb.com/try/download/community)
   - **Option B:** Cloud database at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free tier available)
   - Verify installation: `mongod --version` (local only)

3. **Git** (Latest version)
   - Download: [git-scm.com](https://git-scm.com/)
   - Verify installation: `git --version`

#### Optional but Recommended

- **MongoDB Compass** - GUI for MongoDB
- **VS Code** - Code editor with extensions:
  - ESLint
  - Prettier
  - ES7+ React/Redux snippets
  - Tailwind CSS IntelliSense
- **Postman** - API testing tool

### Operating System Support

- ✅ **Windows** 10/11
- ✅ **macOS** 11 (Big Sur) or later
- ✅ **Linux** Ubuntu 20.04+, Fedora 34+, Arch Linux

---

## Installation Steps

### Step 1: Verify Prerequisites

Open a terminal/command prompt and verify all required software is installed:

```bash
# Check Node.js version (should be 18.0.0 or higher)
node --version
# Expected output: v18.x.x or higher

# Check npm version
npm --version
# Expected output: 9.x.x or higher

# Check Git version
git --version
# Expected output: git version 2.x.x

# Check MongoDB version (if using local MongoDB)
mongod --version
# Expected output: db version v6.x.x or higher
```

✅ **All versions should meet the minimum requirements. If not, install or update the software.**

---

### Step 2: Clone or Download the Project

#### Option A: Clone from GitHub

```bash
# Clone the repository
git clone https://github.com/PLP-MERN-Stack-Development/mern-stack-integration-emutua23.git
cd mern-stack-integration-emutua23

# Verify files
ls -la
# You should see: backend/, frontend/, README.md, etc.
```

#### Option B: Download ZIP File

1. Download the ZIP file from your source
2. Extract to a folder (e.g., `C:\Projects\mern-stack-integration-emutua23`)
3. Open terminal in that folder

```bash
cd path/to/mern-stack-integration-emutua23
```

---

### Step 3: Install Backend Dependencies

```bash
# Navigate to backend directory
cd backend

# Install all npm packages
npm install

# This will install:
# - express, mongoose, cors, dotenv
# - jsonwebtoken, bcryptjs
# - express-validator
# - multer, nodemon
# 
# Expected output: "added XXX packages" (takes 1-2 minutes)
```

**What gets installed:**
- **express** - Web server framework
- **mongoose** - MongoDB ORM
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **cors** - Cross-origin requests
- **dotenv** - Environment variables
- **multer** - File uploads
- **nodemon** - Auto-restart server (dev dependency)

**Verification:**
```bash
# Check if node_modules folder was created
ls node_modules
# Should see many folders

# Verify package.json scripts
npm run
# Should show: dev, start, seed
```

---

### Step 4: Install Frontend Dependencies

```bash
# Go back to root and navigate to frontend
cd ../frontend

# Install all npm packages
npm install

# This will install:
# - react, react-dom, react-router-dom
# - vite
# - tailwindcss, @tailwindcss/vite
# - @radix-ui/* components
# - axios, @clerk/clerk-react
# - lucide-react
#
# Expected output: "added XXX packages" (takes 2-3 minutes)
```

**What gets installed:**
- **react** - UI library
- **vite** - Build tool
- **tailwindcss** - CSS framework
- **@radix-ui/** - UI components
- **axios** - HTTP client
- **@clerk/clerk-react** - Authentication
- **lucide-react** - Icons
- **react-router-dom** - Routing

**Verification:**
```bash
# Check if node_modules folder was created
ls node_modules
# Should see many folders

# Verify package.json scripts
npm run
# Should show: dev, build, lint, preview
```

---

## Configuration

### Step 5: Configure Backend Environment

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Copy the example environment file:**
   ```bash
   # On macOS/Linux:
   cp .env.example .env

   # On Windows:
   copy .env.example .env
   ```

3. **Edit `.env` file:**
   
   Open `backend/.env` in your text editor and configure:

   ```env
   # ===========================================
   # DATABASE CONFIGURATION
   # ===========================================
   # Choose ONE option below:

   # Option A: Local MongoDB (default)
   MONGODB_URI=mongodb://localhost:27017/blog-app

   # Option B: MongoDB Atlas (cloud)
   # MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/blog-app?retryWrites=true&w=majority

   # ===========================================
   # SERVER CONFIGURATION
   # ===========================================
   PORT=5000
   ALLOWED_ORIGIN=http://localhost:5173

   # ===========================================
   # JWT AUTHENTICATION
   # ===========================================
   # IMPORTANT: Generate a secure secret key for production!
   # Run: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRATION=7d
   ```

**⚠️ Important Notes:**

- If using **local MongoDB**: Keep `MONGODB_URI=mongodb://localhost:27017/blog-app`
- If using **MongoDB Atlas**: 
  1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  2. Create a cluster (M0 Free tier)
  3. Get connection string
  4. Replace the commented `MONGODB_URI` line

- **JWT_SECRET**: 
  - ⚠️ MUST be changed for production
  - Generate secure key: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
  - Keep this secret!

---

### Step 6: Configure Frontend Environment

1. **Navigate to frontend directory:**
   ```bash
   cd ../frontend
   ```

2. **Copy the example environment file:**
   ```bash
   # On macOS/Linux:
   cp .env.example .env

   # On Windows:
   copy .env.example .env
   ```

3. **Edit `.env` file:**

   Open `frontend/.env` in your text editor:

   ```env
   # ===========================================
   # API CONFIGURATION
   # ===========================================
   # Backend API URL (must match backend PORT)
   VITE_API_URL=http://localhost:5000

   # ===========================================
   # CLERK AUTHENTICATION
   # ===========================================
   # Get your Clerk Publishable Key from clerk.com
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

4. **Get Clerk Publishable Key:**

   **Step-by-step:**

   a. **Sign up for Clerk:**
      - Visit [clerk.com](https://clerk.com)
      - Click "Start building for free"
      - Sign up with GitHub, Google, or email

   b. **Create Application:**
      - Click "+ Create application"
      - Application name: "MERN Blog App"
      - Choose authentication methods:
        - ✅ Email
        - ✅ Google (recommended)
        - ✅ GitHub (optional)
      - Click "Create application"

   c. **Get API Key:**
      - You'll see the API Keys page
      - Copy the **Publishable Key** (starts with `pk_test_...`)
      - Paste into `frontend/.env`:
        ```env
        VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_copied_key_here
        ```

   d. **Configure Application URLs:**
      - Go to "Paths" in Clerk dashboard
      - Set these URLs:
        - Sign-in URL: `/sign-in`
        - Sign-up URL: `/sign-up`
        - After sign-in URL: `/`
        - After sign-up URL: `/`

**✅ Configuration Complete!**

---

## Database Setup

### Option A: Local MongoDB Setup

#### macOS (with Homebrew)

```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Verify MongoDB is running
mongosh
# You should see: "Connecting to: mongodb://127.0.0.1:27017"
# Type 'exit' to close
```

#### Linux (Ubuntu/Debian)

```bash
# Import MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update package list
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify MongoDB is running
sudo systemctl status mongod
# Should show: "active (running)"

# Test connection
mongosh
# Type 'exit' to close
```

#### Windows

1. **Download MongoDB:**
   - Visit [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Select "Windows" platform
   - Download the MSI installer

2. **Install MongoDB:**
   - Run the installer
   - Choose "Complete" installation
   - ✅ Check "Install MongoDB as a Service"
   - Click "Install"

3. **Start MongoDB:**
   - MongoDB service starts automatically
   - Or manually: `net start MongoDB`

4. **Verify:**
   ```cmd
   mongosh
   # You should connect successfully
   # Type 'exit' to close
   ```

---

### Option B: MongoDB Atlas Setup (Cloud)

**Advantages:**
- ✅ Free tier available (512 MB storage)
- ✅ No local installation required
- ✅ Accessible from anywhere
- ✅ Automatic backups
- ✅ Easy scaling

**Setup Steps:**

1. **Create Account:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Click "Try Free"
   - Sign up with email or Google

2. **Create Cluster:**
   - Click "Build a Cluster"
   - Select "Shared" (Free tier)
   - Choose cloud provider (AWS/Google/Azure)
   - Select region closest to you
   - Click "Create Cluster" (takes 3-5 minutes)

3. **Create Database User:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `blogadmin`
   - Generate strong password and **save it**
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Address:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Confirm

5. **Get Connection String:**
   - Go to "Databases"
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string:
     ```
     mongodb+srv://blogadmin:<password>@cluster0.xxxxx.mongodb.net/blog-app?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your actual password
   - Replace `blog-app` with your database name

6. **Update Backend .env:**
   ```env
   MONGODB_URI=mongodb+srv://blogadmin:YourActualPassword@cluster0.xxxxx.mongodb.net/blog-app?retryWrites=true&w=majority
   ```

**✅ Database Setup Complete!**

---

## Running the Application

You'll need **THREE terminal windows** running simultaneously.

### Terminal 1: MongoDB (if using local)

**Skip this if using MongoDB Atlas**

```bash
# macOS:
brew services start mongodb-community

# Linux:
sudo systemctl start mongod

# Windows:
net start MongoDB

# Keep this terminal running or run as service
```

Expected output: MongoDB service running on port 27017

---

### Terminal 2: Backend Server

```bash
# Navigate to backend directory
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

**✅ Backend is ready when you see:**
- `MongoDB Connected.....!`
- `API is running on http://localhost:5000`

**Test the backend:**
```bash
# In a new terminal window:
curl http://localhost:5000
# Expected output: "Blog API is up and running..."
```

**Common Issues:**

❌ **Port 5000 already in use:**
```
Error: listen EADDRINUSE :::5000
```
**Solution:** Change `PORT` in `backend/.env` to `5001` or kill the process:
```bash
lsof -i :5000
kill -9 <PID>
```

❌ **MongoDB connection failed:**
```
MongooseServerSelectionError: connect ECONNREFUSED
```
**Solution:** 
- Check MongoDB is running: `mongosh`
- Verify `MONGODB_URI` in `backend/.env`

---

### Terminal 3: Frontend Server

```bash
# Navigate to frontend directory
cd frontend

# Start development server
npm run dev

# Expected output:
# 
#   VITE v7.1.7  ready in 543 ms
# 
#   ➜  Local:   http://localhost:5173/
#   ➜  Network: use --host to expose
#   ➜  press h + enter to show help
```

**✅ Frontend is ready when you see:**
- `Local: http://localhost:5173/`

**Access the application:**
1. Open your browser
2. Go to: `http://localhost:5173`
3. You should see the Blog App homepage

**Common Issues:**

❌ **Port 5173 already in use:**
```
Error: Port 5173 is in use
```
**Solution:** Vite will automatically try port 5174. Check the console output for the actual port.

❌ **Module not found:**
```
Error: Cannot find module '@/lib/utils'
```
**Solution:** 
- Verify `jsconfig.json` exists
- Restart VS Code
- Clear cache: `rm -rf node_modules package-lock.json && npm install`

---

## Verification

### Step 1: Test Backend API

Open a new terminal and run these commands:

```bash
# Test server is running
curl http://localhost:5000
# Expected: "Blog API is up and running..."

# Test categories endpoint
curl http://localhost:5000/api/categories
# Expected: [] (empty array initially)

# Test posts endpoint
curl http://localhost:5000/api/posts
# Expected: {"posts":[],"pagination":{...}}
```

✅ **All commands should return JSON responses without errors.**

---

### Step 2: Test Frontend

1. **Open browser:** `http://localhost:5173`

2. **Check homepage loads:**
   - See "Week 4 • Blog App" header
   - See "All Posts" page
   - See "Sign In" button in header

3. **Test navigation:**
   - Click links in navigation
   - Should not see console errors

4. **Test sign-in:**
   - Click "Sign In" button
   - Clerk sign-in modal should appear
   - If not, check `VITE_CLERK_PUBLISHABLE_KEY` in `frontend/.env`

✅ **If all tests pass, the application is working correctly!**

---

### Step 3: Create Test Account

1. **Click "Sign In"** in the header

2. **Sign up with email:**
   - Enter email address
   - Enter verification code sent to email
   - Set up profile (name, etc.)

3. **You should be redirected** to the homepage

4. **Verify authentication:**
   - See user button in header (instead of "Sign In")
   - See "My Posts" and "Categories" links in navigation

✅ **Authentication is working!**

---

## Seed Sample Data

Optionally populate the database with sample data for testing.

### Run Seed Script

```bash
# Navigate to backend directory
cd backend

# Run the seed script
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
# 
# Summary:
#   - 5 categories
#   - 5 posts
# 
# You can now start using the application with sample data.
```

**What gets seeded:**
- 5 categories: Technology, Lifestyle, Business, Travel, Food
- 5 sample blog posts with comments, likes, and views
- Each post is assigned to a category and has tags

**Refresh the frontend** and you should see the sample posts!

---

## Troubleshooting

### Common Issues and Solutions

#### Issue 1: "Cannot connect to MongoDB"

**Error:**
```
MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions:**

**For Local MongoDB:**
```bash
# Check if MongoDB is running
pgrep mongod
# If no output, start MongoDB:

# macOS:
brew services start mongodb-community

# Linux:
sudo systemctl start mongod

# Windows:
net start MongoDB
```

**For MongoDB Atlas:**
- Verify connection string in `backend/.env`
- Check username and password are correct
- Verify IP is whitelisted in Atlas
- Test connection string with `mongosh`:
  ```bash
  mongosh "your_connection_string_here"
  ```

---

#### Issue 2: "Missing Clerk Publishable Key"

**Error:**
```
Missing Clerk Publishable Key
```

**Solutions:**
1. Verify `VITE_CLERK_PUBLISHABLE_KEY` is set in `frontend/.env`
2. Key should start with `pk_test_` or `pk_live_`
3. No spaces around the `=` sign
4. Restart frontend server: `Ctrl+C` then `npm run dev`
5. Clear browser cache

---

#### Issue 3: "Port already in use"

**Error:**
```
Error: listen EADDRINUSE :::5000
```

**Solutions:**

**Find and kill the process:**
```bash
# macOS/Linux:
lsof -i :5000
kill -9 <PID>

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Or change the port:**
- Edit `backend/.env`: `PORT=5001`
- Edit `frontend/.env`: `VITE_API_URL=http://localhost:5001`
- Restart both servers

---

#### Issue 4: "CORS Error"

**Error:**
```
Access to fetch at 'http://localhost:5000' has been blocked by CORS policy
```

**Solutions:**
1. Verify `ALLOWED_ORIGIN` in `backend/.env` matches frontend URL
2. Should be: `ALLOWED_ORIGIN=http://localhost:5173`
3. Restart backend server
4. Clear browser cache
5. Check backend console for CORS middleware initialization

---

#### Issue 5: "Module not found"

**Error:**
```
Cannot find module '@/lib/utils'
```

**Solutions:**
1. Verify `jsconfig.json` exists in `frontend/`
2. Check `vite.config.js` has path alias configured
3. Restart VS Code (Cmd/Ctrl + Shift + P → "Reload Window")
4. Reinstall dependencies:
   ```bash
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   ```

---

#### Issue 6: Backend crashes on startup

**Check for:**
1. **Syntax errors** in code files
2. **Missing dependencies**: `npm install`
3. **Environment variables** are set correctly
4. **MongoDB connection** is successful

**View detailed errors:**
```bash
cd backend
node src/server.js
# Look for error messages
```

---

#### Issue 7: Frontend won't compile

**Error:**
```
Failed to resolve import
```

**Solutions:**
1. **Check imports** are correct
2. **Verify file paths** match actual files
3. **Clear cache**:
   ```bash
   rm -rf node_modules .vite
   npm install
   ```
4. **Check for typos** in import statements

---

### Getting Help

If you're still having issues:

1. **Check the logs:**
   - Backend: Look at terminal running `npm run dev`
   - Frontend: Look at browser console (F12)

2. **Review the README:**
   - Main README.md for detailed documentation
   - API_DOCUMENTATION.md for API reference

3. **Search for similar issues:**
   - Check GitHub Issues tab
   - Search error message on Google/Stack Overflow

4. **Ask for help:**
   - Create a new GitHub Issue with:
     - Error message
     - Steps to reproduce
     - Your environment (OS, Node version, etc.)
     - What you've tried

---

## Next Steps

Now that your application is running:

### 1. Explore the Application

- ✅ Sign in with your Clerk account
- ✅ Create categories (Technology, Lifestyle, etc.)
- ✅ Write your first blog post
- ✅ Add comments to posts
- ✅ Search and filter posts
- ✅ Test pagination (create 10+ posts)

### 2. Customize the Application

**Backend:**
- Add new API endpoints
- Modify database schemas
- Add more validation rules
- Implement rate limiting

**Frontend:**
- Change color scheme in Tailwind config
- Add new components
- Modify layouts
- Add animations

### 3. Deploy to Production

**Backend Options:**
- [Railway](https://railway.app) - Easy deployment
- [Render](https://render.com) - Free tier available
- [Heroku](https://heroku.com) - Popular choice

**Frontend Options:**
- [Vercel](https://vercel.com) - Optimized for React
- [Netlify](https://netlify.com) - Simple deployment
- [Cloudflare Pages](https://pages.cloudflare.com) - Fast and free

**Database:**
- Use MongoDB Atlas for production (already configured)

### 4. Add More Features

**Ideas:**
- User profiles with avatars
- Rich text editor for posts
- Image uploads for featured images
- Email notifications
- Social sharing buttons
- Post bookmarks
- User following system
- Dark mode

### 5. Learn More

**Resources:**
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Clerk Documentation](https://clerk.com/docs)

---

## Checklist

Use this checklist to track your setup progress:

### Prerequisites
- [ ] Node.js v18+ installed
- [ ] npm v9+ installed
- [ ] MongoDB installed (or Atlas account created)
- [ ] Git installed
- [ ] Code editor installed (VS Code recommended)

### Installation
- [ ] Project cloned/downloaded
- [ ] Backend dependencies installed (`npm install`)
- [ ] Frontend dependencies installed (`npm install`)

### Configuration
- [ ] Backend `.env` file created and configured
- [ ] Frontend `.env` file created and configured
- [ ] Clerk account created
- [ ] Clerk Publishable Key obtained
- [ ] MongoDB connection string configured

### Database
- [ ] MongoDB running (local or Atlas)
- [ ] Database connection successful
- [ ] Sample data seeded (optional)

### Running
- [ ] MongoDB service running (if local)
- [ ] Backend server running (`npm run dev`)
- [ ] Frontend server running (`npm run dev`)
- [ ] Application accessible at `http://localhost:5173`

### Verification
- [ ] Backend API responding
- [ ] Frontend loads without errors
- [ ] Can sign in with Clerk
- [ ] Can create and view posts
- [ ] Can add comments
- [ ] Search and filter working

### Next Steps
- [ ] Created test account
- [ ] Created sample categories
- [ ] Created first blog post
- [ ] Explored all features
- [ ] Read full documentation

---

**Setup Complete! 🎉**

You now have a fully functional MERN Stack Blog Application running on your machine.

**Need help?** Refer to the [Troubleshooting](#troubleshooting) section or create an issue on GitHub.

---

**Last Updated:** October 2025  
**Version:** 2.0.0  
**Guide Author:** [Emanuel Mutua](mailto:emanuel.mutua@gmail.com)
