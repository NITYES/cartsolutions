// middlewares/sessionMiddleware.js
exports.initializeCartSession = (req, res, next) => {
    // Initialize cart in session if it doesn't exist
    if (!req.session.cart) {
      req.session.cart = { items: [] };
    }
    next();
  };
  