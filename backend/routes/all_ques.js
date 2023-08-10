const express = require('express');
const router = express.Router();
const Question = require('../models/ques.js');

router.get('/all_ques', async (req, res) => {
  try {
    // Retrieve all questions with their IDs and names
    const questions = await Question.find({}, 'ques_id name');

    // Return the list of questions
    res.json(questions);
  } catch (err) {
    // Send an error response if there is an error retrieving the question from the database
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
