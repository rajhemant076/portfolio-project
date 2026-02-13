const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/register - Register admin
router.post('/register', authController.register);

// POST /api/auth/login - Login admin
router.post('/login', authController.login);

module.exports = router;