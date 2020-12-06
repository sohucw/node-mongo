// 引入模型
const asyncHandler = require('../middleware/async.js');
const UserEventCount = require('../models/UserEventCount.js');
const ErrorResponse = require('../utils/errorResponse.js');

/**
 * @desc 获取所有userEventCounts数据
 * @route GET /api/v1/userEventCounts
 * @access 公开的
 */
exports.getUserEventCounts = asyncHandler(async (req, res, next) => {
    const advancedResult = res.advancedResult;

    const pagination = advancedResult.pagination;

    let curPage = 1;
    let limit = 0;
    // 没有下一页 没有上一页
    if (!pagination.next && !pagination.prev) {
        curPage = 1;
    } else if (pagination.next) {
        curPage = pagination.next.page - 1;
        limit = pagination.next.limit;
    } else if (pagination.prev) {
        curPage = pagination.prev.page + 1;
        limit = pagination.prev.limit;
    }

    advancedResult.data = advancedResult.data.map((item, index) => {
        const rank = index + 1 + (curPage - 1) * limit;
        return {
            _id: item._id,
            owner: item.owner,
            amount: item.amount,
            rank: rank
        };
    });

    res.status(200).json(advancedResult);
});

/**
 * @desc 创建userEvents数据
 * @route not method
 * @access private
 */
exports.createUserEventCounts = async (eventData) => {
    try {
        // 去重
        const event = eventData.event;
        const returnValues = eventData.returnValues;
        if (returnValues.owner) {
            const userEventCount = await UserEventCount.findOne({
                owner: returnValues.owner
            });

            console.log('userEventCount是否存在', !!userEventCount);
            if (!userEventCount) {
                const newItem = {
                    owner: returnValues.owner,
                    amount: parseInt(returnValues.amount, 10)
                };

                await UserEventCount.create(newItem);
            } else if (userEventCount && event === 'Bidded') {
                let curAmount = userEventCount.amount;
                curAmount += parseInt(returnValues.amount, 10);

                const newItem = {amount: curAmount};

                await UserEventCount.findOneAndUpdate(
                    {owner: returnValues.owner},
                    newItem,
                    {
                        new: true,
                        runValidators: true
                    }
                );
            } else if (userEventCount && event === 'Canceled') {
                // let curAmount = userEventCount.amount;
                // curAmount -= parseInt(returnValues.amount, 10);
                let curAmount = userEventCount.amount;
                curAmount -= parseInt(returnValues.amount, 10);

                const newItem = {amount: curAmount};

                await UserEventCount.findOneAndUpdate(
                    {owner: returnValues.owner},
                    newItem,
                    {
                        new: true,
                        runValidators: true
                    }
                );
            }
        }
    } catch (error) {
        console.error('error :', error);
    }
};
