// controllers/authController.js
const authService = require('../services/authService');
const CustomError = require('../utils/customError');

// Register a new user
exports.registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.registerUser(email, password); // Call Auth Service
    res.status(201).json({
      message: 'User registered successfully',
      user
    });
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};

// Login user
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.loginUser(email, password); // Call Auth Service
    res.status(200).json({
      message: 'Login successful',
      token,
      user,
    });
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};
