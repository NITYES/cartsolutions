// controllers/cartController.js
const cartService = require('../services/cartService');
const CustomError = require('../utils/customError');

// Add item to cart (both logged-in and anonymous users)
exports.addItemToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await cartService.addItemToCart(req.user, productId, quantity, req.session.cart);
    
    // If the user is anonymous, store cart in session
    if (!req.user) {
      req.session.cart = cart;
    }
    res.status(200).json({ cart });
  } catch (error) {
    next(error);
  }
};

// Merge anonymous cart with logged-in user's cart
exports.mergeCart = async (req, res, next) => {
  try {
    const mergedCart = await cartService.mergeCarts(req.user, req.session.cart);
    req.session.cart = mergedCart; // Update session cart with merged cart
    res.status(200).json({ cart: mergedCart });
  } catch (error) {
    next(error);
  }
};

// Remove item from cart (both for logged-in and anonymous users)
exports.removeItemFromCart = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const cart = await cartService.removeItemFromCart(req.user, productId, req.session.cart);
    
    // If the user is anonymous, store updated cart in session
    if (!req.user) {
      req.session.cart = cart;
    }
    res.status(200).json({ message: 'Item removed successfully', cart });
  } catch (error) {
    next(error);
  }
};

// Get cart details (both for logged-in and anonymous users)
exports.getCartDetails = async (req, res, next) => {
  try {
    const cart = await cartService.getCartDetails(req.user, req.session.cart);
    res.status(200).json({ cart });
  } catch (error) {
    next(error);
  }
};
