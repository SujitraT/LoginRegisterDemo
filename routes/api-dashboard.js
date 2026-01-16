const express = require('express');
const router = express.Router();

// controller
const graphController = require('../controllers/GraphController');

router.get('/graph', graphController.getGraphData);

module.exports = router;