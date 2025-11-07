const { body, validationResult } = require('express-validator');

// Validation rules
const menuValidationRules = [
  body('name').isString().isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
  body('description').isString().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
  body('category').isIn(['appetizer', 'entree', 'dessert', 'beverage']).withMessage('Invalid category'),
  body('ingredients').isArray({ min: 1 }).withMessage('Ingredients must be an array with at least one item'),
  body('available').optional().isBoolean().withMessage('Available must be a boolean'),
];

// Middleware to check validation results
const validateMenu = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { menuValidationRules, validateMenu };
