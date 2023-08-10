const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.post('/log_in', async (req, res) => {
  const { user_name, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ user_name });

    // Check if the user exists and the password is correct
    if (user && user.password === password) {
      // Login successful
      res.status(200).json({ message: 'Login successful' });
    } else {
      // Invalid username or password
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    // Handle database or server error
    console.error('Login failed:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
