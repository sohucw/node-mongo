const express = require('express');
const router = express.Router();

const {getUserBids} = require('../controllers/userBids');
const advancedResult = require('../middleware/advancedResult');

const UserBid = require('../models/UserBid');

// http://localhost:5000/api/v1/userBids
router.route('/').get(advancedResult(UserBid), getUserBids);

// http://localhost:5000/api/v1/userBids/:id
// router.route('/:id').get(getMscamp).put(updateMscamp).delete(deleteMscamp);

module.exports = router;
