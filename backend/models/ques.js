const mongoose = require('mongoose');
const Testcase = require('./testcase');

const questionSchema = new mongoose.Schema({
  ques_id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  question: {
    type: Buffer,
    required: true
  },
  solution: {
    type: Buffer,
    required: true
  },
  testcases: {
    type: [Testcase.schema],
    default: []
  }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
