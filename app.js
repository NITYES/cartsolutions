// app.js
const express = require('express');
const session = require('express-session');
const connectDB = require('./config/db');
const cartRoutes = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

// Set up session middleware
app.use(
  session({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

// MongoDB connection
connectDB();

// Middleware for parsing JSON bodies
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);  // Authentication routes
app.use('/api/v1/cart', cartRoutes);  // Cart routes

// Error handler middleware
// app.use(errorHandler);

module.exports = app;
