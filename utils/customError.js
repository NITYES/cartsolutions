// utils/customError.js

class CustomError extends Error {
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
      this.message = message;
      this.isOperational = true; // Indicates if the error is operational (i.e., expected in the business logic)
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = CustomError;
  