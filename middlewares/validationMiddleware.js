// middlewares/validationMiddleware.js
const Joi = require('joi');
const CustomError = require('../utils/customError');

// Joi validation schema for cart item (productId and quantity)
exports.validateCartItem = (req, res, next) => {
  const schema = Joi.object({
    productId: Joi.string().required().messages({
      'string.empty': 'Product ID is required',
    }),
    quantity: Joi.number().integer().min(1).required().messages({
      'number.min': 'Quantity must be greater than 0',
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return next(new CustomError(400, error.details[0].message));
  }
  next();
};
