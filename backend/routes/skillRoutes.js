const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');
const authMiddleware = require('../middleware/auth');

// GET /api/skills - Get all skills (public)
router.get('/', skillController.getSkills);

// POST /api/skills - Create skill (admin only)
router.post('/', authMiddleware, skillController.createSkill);

// PUT /api/skills/:id - Update skill (admin only)
router.put('/:id', authMiddleware, skillController.updateSkill);

// DELETE /api/skills/:id - Delete skill (admin only)
router.delete('/:id', authMiddleware, skillController.deleteSkill);

module.exports = router;