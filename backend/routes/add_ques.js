const express = require('express');
const router = express.Router();
const Question = require('../models/ques.js');
const fs = require('fs');

router.post('/add_ques', async (req, res) => {
  try {
    //console.log("function called");
    const newQuestion = new Question({
      ques_id: req.body.ques_id,
      name: req.body.name,
      question: req.body.question,
      solution: req.body.solution,
      testcases: req.body.testcases || []
    });

    // Save the new question to the database
    const savedQuestion = await newQuestion.save();

    // Send a success response with the saved question object
    res.status(201).json(savedQuestion);
  } catch (err) {
    // Send an error response if there is an error saving the question to the database
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
