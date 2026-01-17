const express = require('express');
const router = express.Router();

// controller
const SendmailResetController = require('../controllers/SendmailResetController');

router.post('/sendmail',SendmailResetController);

module.exports = router;