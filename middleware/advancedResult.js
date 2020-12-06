/**
 * @file 高级查询中间件
 */

const advancedResult = (model, populate) => async (req, res, next) => {
    let query;

    const reqQuery = {...req.query};

    // 处理关键字
    const removeFields = ['select', 'sort', 'page', 'limit'];
    // 清除关键字及值
    removeFields.forEach((param) => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(
        /\b(gt|gte|lt|lte|in)\b/g,
        (match) => `$${match}`
    );

    let queryArr = [
        JSON.parse(queryStr),
        {
            __v: false,
            createAt: false
        }
    ];

    if (req.query.select) {
        queryArr = JSON.parse(queryStr);
    }

    query = model.find.apply(model, queryArr);

    // 在query所有数据的基础上,在加条件
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query.select(fields);
    }

    // 处理sort排序
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }

    // 分页
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments();

    query.skip(startIndex).limit(limit);

    if (populate) {
        // 联表查询
        query = query.populate(populate);
    }

    const results = await query;

    // 分页返回值
    const pagination = {};
    if (startIndex > 0) {
        pagination.prev = {page: page - 1, limit};
    }

    if (endIndex < total) {
        pagination.next = {page: page + 1, limit};
    }

    res.advancedResult = {
        success: true,
        total,
        count: results.length,
        pagination,
        data: results
    };
    next();
};

module.exports = advancedResult;
