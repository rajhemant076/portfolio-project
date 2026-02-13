const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  techStack: {
    type: [String],
    default: []
  },
  githubLink: {
    type: String,
    default: ''
  },
  liveLink: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', projectSchema);