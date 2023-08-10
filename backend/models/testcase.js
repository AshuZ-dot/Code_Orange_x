const mongoose = require('mongoose');

const testcaseSchema = new mongoose.Schema({
  input: {
    type: Buffer,
    required: true
  },
  expectedOutput :{
    type: Buffer,
    required: true
  },
  is_open: {
    type: Boolean,
    default: true
  }
});

const Testcase = mongoose.model('Testcase', testcaseSchema);

module.exports = Testcase;