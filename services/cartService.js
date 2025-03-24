// services/cartService.js
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const CustomError = require('../utils/customError');

// Add item to cart (logged-in and anonymous users)
const addItemToCart = async (user, productId, quantity, sessionCart) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new CustomError(404, 'Product not found');
  }

  if (user) {
    // For logged-in users
    const cart = await Cart.findOneAndUpdate(
      { user: user._id }, // Find the cart by user ID
      {
        $set: { user: user._id }, // Ensure the cart is associated with the logged-in user
        $push: { items: { productId, quantity } }, // Add new item to the cart
      },
      { new: true, upsert: true } // Create cart if not exists and return updated cart
    );
    return cart;
  } else {
    // For anonymous users (session-based)
    sessionCart = sessionCart || { items: [] };

    const existingItemIndex = sessionCart.items.findIndex(item => item.productId === productId);
    if (existingItemIndex !== -1) {
      sessionCart.items[existingItemIndex].quantity += quantity;
    } else {
      sessionCart.items.push({ productId, quantity });
    }

    return sessionCart;
  }
};

// Remove item from cart (logged-in and anonymous users)
const removeItemFromCart = async (user, productId, sessionCart) => {
  if (user) {
    // For logged-in users, use the $pull operator to remove the item
    const cart = await Cart.findOneAndUpdate(
      { user: user._id },
      { $pull: { items: { productId } } }, // Remove item by productId
      { new: true }
    );
    if (!cart) {
      throw new CustomError(404, 'Cart not found');
    }
    return cart;
  } else {
    // For anonymous users (session-based)
    if (!sessionCart) {
      throw new CustomError(404, 'Cart not found');
    }

    const itemIndex = sessionCart.items.findIndex(item => item.productId === productId);
    if (itemIndex !== -1) {
      sessionCart.items.splice(itemIndex, 1); // Remove item from the session cart
    }
    return sessionCart;
  }
};

// Get cart details (logged-in and anonymous users)
const getCartDetails = async (user, sessionCart) => {
  if (user) {
    const cart = await Cart.findOne({ user: user._id });
    if (!cart) {
      throw new CustomError(404, 'Cart not found');
    }
    return cart;
  } else {
    if (!sessionCart) {
      throw new CustomError(404, 'Cart not found');
    }
    return sessionCart;
  }
};

// Merge session cart with the user's cart when they log in
const mergeCarts = async (user, sessionCart) => {
  if (!user) {
    return sessionCart; // If no user is logged in, return session cart
  }

  let cart = await Cart.findOne({ user: user._id });

  if (!cart) {
    // If the user does not have a cart, create a new one
    cart = new Cart({ user: user._id, items: [] });
  }

  // Merge session cart items into the user's cart
  for (const sessionItem of sessionCart.items) {
    await cart.addItem(sessionItem.productId, sessionItem.quantity); // Add each item from session cart
  }

  // Clear session cart after merging
  return cart;
};

module.exports = {
  addItemToCart,
  removeItemFromCart,
  getCartDetails,
  mergeCarts,
};
