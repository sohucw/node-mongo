// 创建中间件
const logger = (req, res, next) => {
    // req.data = {msg: 'hello world'};
    console.log('req.originalUrl', req.originalUrl);
    console.log(
        `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
    );
    next();
};

module.exports = logger;
