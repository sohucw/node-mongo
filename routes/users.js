const express = require('express');
const router = express.Router();

const {
    getUsers,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/users');
const getData = require('../getData.js');
const User = require('../models/User');
const advancedResult = require('../middleware/advancedResult');

let interId;

function startGetData() {
    clearInterval(interId);
    const interval = 1000 * 60 * 1; // 1分钟执行一次
    console.log('getData start');

    interId = setInterval(async () => {
        try {
            console.log('getData ing');
            await getData();
            console.log('getData end');
        } catch (error) {
            console.log('error :', error);
        } finally {
            console.log('getData finally');
        }
    }, interval);
}

startGetData();

// http://localhost:5000/api/v1/users
router.route('/').get(
    advancedResult(User, {
        path: 'bids',
        select: 'owner live index token amount'
    }),
    getUsers
);

// http://localhost:5000/api/v1/users/stop
router.post('/stop', (req, res) => {
    clearInterval(interId);
    res.status(200).json({success: true, message: '停止获取数据'});
});

// http://localhost:5000/api/v1/users/restart
router.post('/restart', (req, res) => {
    startGetData();
    res.status(200).json({success: true, message: '重新开始获取数据'});
});

// http://localhost:5000/api/v1/users/:id
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
