const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  resumeLink: {
    type: String,
    default: ''
  },
  profileImage: {
    type: String,
    default: ''
  },
  socials: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' }
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Profile', profileSchema);