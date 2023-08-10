const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  ques_id: {
    type: Number,
    required: true
  },
  code: {
    type: Buffer,
    required: true
  }
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;