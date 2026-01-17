const express = require('express');
const router = express.Router();


const ResetPasswordController = require('../controllers/ResetPasswordController');

router.get('/reset/:token',ResetPasswordController);

module.exports = router;