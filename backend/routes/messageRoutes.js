const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authMiddleware = require('../middleware/auth');

// POST /api/messages - Create message (public)
router.post('/', messageController.createMessage);

// GET /api/messages - Get all messages (admin only)
router.get('/', authMiddleware, messageController.getMessages);

// DELETE /api/messages/:id - Delete message (admin only)
router.delete('/:id', authMiddleware, messageController.deleteMessage);

module.exports = router;