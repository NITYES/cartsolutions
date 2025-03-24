// services/authService.js
const User = require('../models/userModel');
const CustomError = require('../utils/customError');
const bcrypt = require('bcryptjs');

// Register user (create new user and hash password)
const registerUser = async (email, password) => {
  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new CustomError(400, 'User already exists');
  }

  // Create a new user
  const user = new User({ email, password });
  await user.save(); // Save the user in the database

  return user;
};

// Login user (check email and password)
const loginUser = async (email, password) => {
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError(400, 'Invalid email or password');
  }

  // Check if the password is correct
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new CustomError(400, 'Invalid email or password');
  }

  // Generate JWT token for the user
  const token = user.generateAuthToken();
  return { token, user };
};

// Generate JWT token (in case you want to handle it separately)
const generateToken = (user) => {
  return user.generateAuthToken();
};

module.exports = {
  registerUser,
  loginUser,
  generateToken,
};
