// 引入模型
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @desc 获取所有用户数据
 * @route GET /api/v1/users
 * @access 公开的
 */
exports.getUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResult);
});

/**
 * @desc 创建用户数据
 * @route not method
 * @access private
 */
exports.createUsers = async (err, data) => {
    const newItem = {
        addr: data.addr,
        amount: data.amount
    };
    try {
        const user = await User.findOne({addr: data.addr});
        if (user) {
            await User.findOneAndUpdate({addr: data.addr}, newItem, {
                new: true,
                runValidators: true
            });
            return;
        }

        const result = await User.create(newItem);
    } catch (error) {
        console.error('error :', error);
    }
};

/**
 * @desc 根据${req.params.id}获取用户数据
 * @route GET /api/v1/users/:id
 * @access 公开的
 */
exports.getUser = asyncHandler(async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id, {
            __v: false,
            createAt: false
        });
        if (!user) {
            return next(
                new ErrorResponse(
                    `Resource not found with id of ${req.params.id}`,
                    404
                )
            );
        }
        res.status(200).json({success: true, data: user});
    } catch (error) {
        next(error);
    }
});

/**
 * @desc 根据${req.params.id}更新用户数据
 * @route PUT /api/v1/users/:id
 * @access 公开的
 */
exports.updateUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!user) {
        return next(
            new ErrorResponse(
                `Resource not found with id of ${req.params.id}`,
                404
            )
        );
    }
    res.status(200).json({success: true, data: user});
});

/**
 * @desc 根据${req.params.id}删除用户数据
 * @route DELETE /api/v1/users/:id
 * @access 公开的
 */
exports.deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        return next(
            new ErrorResponse(
                `Resource not found with id of ${req.params.id}`,
                404
            )
        );
    }
    res.status(200).json({success: true, data: {}});
});
