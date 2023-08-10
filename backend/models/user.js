const mongoose = require('mongoose');
const Submission = require('./submission');

const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  submissions: {
    type: [Submission.schema],
    validate: [arrayLimit, '{PATH} exceeds the limit of 5'],
    default: []
  },
  done_ques: {
    type: [Number],
    default: []
  }
});

// Custom validator function to limit the number of submissions to 5
function arrayLimit(val) {
  return val.length <= 5;
}

const User = mongoose.model('User', userSchema);

module.exports = User;