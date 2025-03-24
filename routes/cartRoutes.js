// routes/cartRoutes.js
const express = require('express');
const { addItemToCart, removeItemFromCart, getCartDetails, mergeCart } = require('../controllers/cartController');
const { validateCartItem } = require('../middlewares/validationMiddleware');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { initializeCartSession } = require('../middlewares/sessionMiddleware');

const router = express.Router();

// Ensure session cart is initialized for anonymous users
router.use(initializeCartSession);

// Add item to cart - Auth middleware for logged-in users
router.post('/add',  validateCartItem, addItemToCart);

// Remove item from cart - Auth middleware for logged-in users
router.post('/remove', removeItemFromCart);

// Get cart details - Allow anonymous users and logged-in users
router.get('/view', getCartDetails);

// Merge cart when the user logs in - Auth middleware required
router.post('/merge', authMiddleware, mergeCart);

module.exports = router;
