// middlewares/errorMiddleware.js
const CustomError = require('../utils/customError');

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // For other unexpected errors
  console.error(err);
  res.status(500).json({ message: 'Something went wrong' });
};

module.exports = errorHandler;
