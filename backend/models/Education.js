const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  college: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Education', educationSchema);