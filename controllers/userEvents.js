// 引入模型
const asyncHandler = require('../middleware/async.js');
const UserEvent = require('../models/UserEvent.js');
const ErrorResponse = require('../utils/errorResponse.js');

/**
 * @desc 获取所有userEvents数据
 * @route GET /api/v1/userEvents
 * @access 公开的
 */
exports.getUserEvents = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResult);
});

/**
 * @desc 创建userEvents数据
 * @route not method
 * @access private
 */
exports.createUserEvents = async (eventData) => {
    try {
        const result = await UserEvent.create(eventData);
    } catch (error) {
        console.error('error :', error);
    }
};
