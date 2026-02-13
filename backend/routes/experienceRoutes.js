const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experienceController');
const authMiddleware = require('../middleware/auth');

// GET /api/experience - Get all experience (public)
router.get('/', experienceController.getExperience);

// POST /api/experience - Create experience (admin only)
router.post('/', authMiddleware, experienceController.createExperience);

// PUT /api/experience/:id - Update experience (admin only)
router.put('/:id', authMiddleware, experienceController.updateExperience);

// DELETE /api/experience/:id - Delete experience (admin only)
router.delete('/:id', authMiddleware, experienceController.deleteExperience);

module.exports = router;