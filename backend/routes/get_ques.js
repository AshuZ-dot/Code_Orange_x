const express = require('express');
const router = express.Router();
const Question = require('../models/ques.js');

function decodeTwice(inputString) {
    let temp = Buffer.from(inputString).toString('base64');
    let decodedString = atob(temp);
    decodedString = atob(decodedString);
    return decodedString;
}
  
router.get('/get_question/:ques_id', async (req, res) => {
    try {
      const ques_id = req.params.ques_id;
  
      // Find the question with the given ques_id
      const question = await Question.findOne({ ques_id });
  
      // Return the question data in the response
      if (question) {
        const testcases = question.testcases.map(testcase => {
          const decodedInput = decodeTwice(testcase.input);
          const decodedExpectedOutput = decodeTwice(testcase.expectedOutput);
          return {
            ...testcase,
            input: decodedInput,
            expectedOutput: decodedExpectedOutput
          };
        });
  
        const questionData = {
          _id: question._id,
          ques_id: question.ques_id,
          name: question.name,
          question: decodeTwice(question.question),
          solution: decodeTwice(question.solution),
          testcases: testcases
        };
        res.status(200).json(questionData);
      } else {
        res.status(404).json({ message: `Question with ques_id ${ques_id} not found` });
      }
    } catch (err) {
      // Send an error response if there is an error retrieving the question from the database
      res.status(500).json({ message: err.message });
    }
  });
  

// router.get('/get_question/:ques_id', async (req, res) => {
//     try {
//       const ques_id = req.params.ques_id;
      
//       // Find the question with the given ques_id
//       const question = await Question.findOne({ ques_id });
      
      
//       // Return the question data in the response
//       if (question) {
    
//         const questionData = {
//           _id: question._id,
//           ques_id: question.ques_id,
//           name: question.name,
//           question: decodeTwice(question.question),
//           solution: decodeTwice(question.solution),
//           testcases: question.testcases
//         };
//         res.status(200).json(questionData);
//       } else {
//         res.status(404).json({ message: `Question with ques_id ${ques_id} not found` });
//       }
//     } catch (err) {
//       // Send an error response if there is an error retrieving the question from the database
//       res.status(500).json({ message: err.message });
//     }
//   });
  
module.exports = router;
