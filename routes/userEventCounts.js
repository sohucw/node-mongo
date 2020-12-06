const express = require('express');
const router = express.Router();

const {getUserEventCounts} = require('../controllers/userEventCounts.js');
const UserEventCount = require('../models/UserEventCount.js');
const advancedResult = require('../middleware/advancedResult.js');

// http://localhost:5000/api/v1/userEventCounts
router.route('/').get(advancedResult(UserEventCount), getUserEventCounts);

module.exports = router;
