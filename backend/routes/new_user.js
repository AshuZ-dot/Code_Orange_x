const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.post('/add_user', async (req, res) => {
  try {
    // Check if the username already exists in the database
    const usernameExists = await User.exists({ user_name: req.body.user_name });
    if (usernameExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Check if the email address is already in use in the database
    const emailExists = await User.exists({ email: req.body.email });
    if (emailExists) {
      return res.status(400).json({ message: 'Email address already in use' });
    }

    // Create a new user object based on the request body
    const newUser = new User({
      user_name: req.body.user_name,
      password: req.body.password,
      email: req.body.email
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Send a success response with the saved user object
    res.status(201).json(savedUser);
  } catch (err) {
    // Send an error response if there is an error saving the user to the database
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
