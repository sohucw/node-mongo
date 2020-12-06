// 引入模型
const asyncHandler = require('../middleware/async');
const UserBid = require('../models/UserBid');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @desc 获取所有用户订单数据
 * @route GET /api/v1/userBids
 * @access 公开的
 */
exports.getUserBids = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResult);
});

/**
 * @desc 创建用户订单数据
 * @route not method
 * @access private
 */
exports.createUserBids = async (err, data) => {
    // console.log('bids=======', data);
    const newItem = {
        owner: data.owner,
        live: data.live,
        index: data.index,
        token: data.token,
        amount: data.amount
    };

    try {
        const result = await UserBid.create(newItem);
    } catch (error) {
        console.error('error :', error);
    }
};
