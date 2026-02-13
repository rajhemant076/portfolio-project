const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/auth');

// GET /api/profile - Get profile (public)
router.get('/', profileController.getProfile);

// PUT /api/profile - Update profile (admin only)
router.put('/', authMiddleware, profileController.updateProfile);

module.exports = router;