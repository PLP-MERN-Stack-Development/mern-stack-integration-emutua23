// Sample data for testing the blog application
// Run this script to populate your database with sample data

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Import models
const Category = require('../models/Category');
const Post = require('../models/Post');
const User = require('../models/User');

// Connect to MongoDB
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected for seeding...');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

// Sample categories
const categories = [
    {
        name: 'Technology',
        slug: 'technology',
        description: 'All about tech, programming, and software development',
        color: '#3b82f6'
    },
    {
        name: 'Lifestyle',
        slug: 'lifestyle',
        description: 'Life, health, and personal development',
        color: '#ec4899'
    },
    {
        name: 'Business',
        slug: 'business',
        description: 'Entrepreneurship, startups, and business insights',
        color: '#10b981'
    },
    {
        name: 'Travel',
        slug: 'travel',
        description: 'Travel guides, tips, and adventures',
        color: '#f59e0b'
    },
    {
        name: 'Food',
        slug: 'food',
        description: 'Recipes, restaurants, and culinary experiences',
        color: '#ef4444'
    }
];

// Sample posts
const posts = [
    {
        title: 'Getting Started with MERN Stack Development',
        content: `The MERN stack is a powerful combination of technologies that allows you to build full-stack web applications using JavaScript throughout. MERN stands for MongoDB, Express.js, React, and Node.js.

MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. This makes it easy to work with and scale your application as it grows.

Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

React is a JavaScript library for building user interfaces. It allows you to create reusable UI components and manage application state efficiently.

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript on the server side.

Together, these technologies create a powerful, efficient, and scalable stack for modern web development.`,
        excerpt: 'Learn about the MERN stack and why it\'s great for full-stack development',
        tags: ['mern', 'javascript', 'web-development', 'tutorial'],
        status: 'published'
    },
    {
        title: '10 Tips for Better Code Reviews',
        content: `Code reviews are an essential part of the software development process. Here are 10 tips to make your code reviews more effective:

1. Review small chunks of code at a time
2. Use a checklist to ensure consistency
3. Be constructive in your feedback
4. Focus on the code, not the person
5. Ask questions instead of making demands
6. Automate what you can
7. Review promptly
8. Use code review tools
9. Learn from others' reviews
10. Keep improving the process

Remember, code reviews are about improving code quality and sharing knowledge across the team.`,
        excerpt: 'Improve your code review process with these practical tips',
        tags: ['code-review', 'best-practices', 'software-engineering'],
        status: 'published'
    },
    {
        title: 'Understanding React Hooks: A Comprehensive Guide',
        content: `React Hooks revolutionized how we write React components. Introduced in React 16.8, Hooks allow you to use state and other React features without writing a class.

useState: The most basic Hook. It allows you to add state to functional components.

useEffect: This Hook lets you perform side effects in functional components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount combined.

useContext: Access React context without using Consumer component.

useReducer: An alternative to useState for more complex state logic.

Custom Hooks: You can create your own Hooks to reuse stateful logic between components.

Hooks make your code more readable and easier to test. They encourage code reuse and help you separate concerns in your application.`,
        excerpt: 'Master React Hooks with this comprehensive guide covering all the essentials',
        tags: ['react', 'hooks', 'javascript', 'frontend'],
        status: 'published'
    },
    {
        title: 'Building RESTful APIs with Express.js',
        content: `Express.js is the most popular Node.js framework for building web applications and APIs. Here's how to build a RESTful API:

1. Set up your Express server
2. Define your routes (GET, POST, PUT, DELETE)
3. Create middleware for authentication and validation
4. Connect to your database
5. Implement error handling
6. Test your endpoints

Best practices include versioning your API, using proper HTTP status codes, implementing pagination for large datasets, and documenting your API thoroughly.

With Express.js, you can build scalable and maintainable APIs that power your applications.`,
        excerpt: 'Learn how to build robust RESTful APIs using Express.js',
        tags: ['express', 'nodejs', 'api', 'backend'],
        status: 'published'
    },
    {
        title: 'MongoDB Schema Design Best Practices',
        content: `Designing your MongoDB schema correctly from the start can save you countless hours later. Here are some best practices:

1. Embed vs Reference: Decide when to embed documents and when to reference them
2. Use indexes wisely: They speed up queries but slow down writes
3. Consider your query patterns: Design your schema based on how you'll query the data
4. Avoid large arrays: They can cause performance issues
5. Use appropriate data types: Store dates as dates, not strings
6. Plan for growth: Think about how your data will scale

Remember, MongoDB is flexible, but that doesn't mean you shouldn't plan your schema carefully.`,
        excerpt: 'Master MongoDB schema design with these proven best practices',
        tags: ['mongodb', 'database', 'nosql', 'backend'],
        status: 'published'
    }
];

// Seed function
async function seedDatabase() {
    try {
        // Clear existing data
        console.log('Clearing existing data...');
        await Category.deleteMany({});
        await Post.deleteMany({});
        
        // Insert categories
        console.log('Inserting categories...');
        const insertedCategories = await Category.insertMany(categories);
        console.log(`✓ Inserted ${insertedCategories.length} categories`);

        // Add userId and userName to posts and random categories
        console.log('Inserting posts...');
        const postsWithDetails = posts.map((post, index) => ({
            ...post,
            userId: 'demo-user-123',
            userName: 'Demo User',
            userEmail: 'demo@example.com',
            categories: [insertedCategories[index % insertedCategories.length]._id],
            comments: [
                {
                    userId: 'commenter-1',
                    userName: 'John Doe',
                    content: 'Great article! Very helpful and informative.'
                },
                {
                    userId: 'commenter-2',
                    userName: 'Jane Smith',
                    content: 'Thanks for sharing this. Looking forward to more content like this!'
                }
            ],
            likes: Math.floor(Math.random() * 50) + 10,
            views: Math.floor(Math.random() * 500) + 100
        }));

        const insertedPosts = await Post.insertMany(postsWithDetails);
        console.log(`✓ Inserted ${insertedPosts.length} posts`);

        console.log('\n✨ Database seeded successfully!');
        console.log('\nSummary:');
        console.log(`  - ${insertedCategories.length} categories`);
        console.log(`  - ${insertedPosts.length} posts`);
        console.log('\nYou can now start using the application with sample data.');
        
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\nDatabase connection closed.');
    }
}

// Run the seed function
connectDB().then(() => {
    seedDatabase();
});