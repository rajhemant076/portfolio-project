const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  points: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Experience', experienceSchema);