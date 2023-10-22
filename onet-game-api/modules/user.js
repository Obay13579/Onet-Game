const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

// Sample in-memory database for users (replace with a database in a real application)
const users = [];

// Route to register a new user
router.post('/register', [
  check('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email address'),

  check('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/)
    .withMessage('Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character'),

  check('name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Name is required')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, name } = req.body;

  // Check if the email is already registered (you should use a database for this)
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return res.status(400).json({ errors: [{ msg: 'Email is already registered' }] });
  }

  // In a real application, you would hash the password before saving it to a database
  // For now, we'll just save it in plain text for simplicity
  const newUser = { email, password, name };
  users.push(newUser);

  res.json({ message: 'User registered successfully' });
});

// Route to log in a user
router.post('/login', (req, res) => {
  // Implement user login logic here
});

// Other user-related routes

module.exports = router;
