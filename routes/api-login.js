const express = require('express');
const router = express.Router();

// controller
const LoginUserController = require('../controllers/LoginUserController');

router.post('/login',LoginUserController);

module.exports = router;