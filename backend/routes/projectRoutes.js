const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/auth');

// GET /api/projects - Get all projects (public)
router.get('/', projectController.getProjects);

// POST /api/projects - Create project (admin only)
router.post('/', authMiddleware, projectController.createProject);

// PUT /api/projects/:id - Update project (admin only)
router.put('/:id', authMiddleware, projectController.updateProject);

// DELETE /api/projects/:id - Delete project (admin only)
router.delete('/:id', authMiddleware, projectController.deleteProject);

module.exports = router;