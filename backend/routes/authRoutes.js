const express = require('express');
const router = express.Router();
const { register, login, loginStatus } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/login-status', loginStatus);

module.exports = router; 