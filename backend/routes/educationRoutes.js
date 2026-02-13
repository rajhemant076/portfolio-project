const express = require('express');
const router = express.Router();
const educationController = require('../controllers/educationController');
const authMiddleware = require('../middleware/auth');

// GET /api/education - Get all education (public)
router.get('/', educationController.getEducation);

// POST /api/education - Create education (admin only)
router.post('/', authMiddleware, educationController.createEducation);

// PUT /api/education/:id - Update education (admin only)
router.put('/:id', authMiddleware, educationController.updateEducation);

// DELETE /api/education/:id - Delete education (admin only)
router.delete('/:id', authMiddleware, educationController.deleteEducation);

module.exports = router;