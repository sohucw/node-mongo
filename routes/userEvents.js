const express = require('express');
const router = express.Router();

const {getUserEvents} = require('../controllers/userEvents.js');
const UserEvent = require('../models/UserEvent.js');
const advancedResult = require('../middleware/advancedResult.js');

const getDataForWs = require('../getDataForWs.js');

// 开始监听 && 存储数据
getDataForWs();

// http://localhost:5000/api/v1/userEvents
router.route('/').get(advancedResult(UserEvent), getUserEvents);

module.exports = router;
