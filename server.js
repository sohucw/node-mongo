const express = require('express');
const dotenv = require('dotenv');

const connectDB = require('./config/db.js');

// const logger = require('./middleware/logger');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error.js');

// 引入路由文件
// const users = require('./routes/users.js');
// const userBids = require('./routes/userBids.js');
const userEvents = require('./routes/userEvents.js');
const userEventCounts = require('./routes/userEventCounts.js');

dotenv.config({
    path: './config/config.env'
});

const app = express();

// 配置Body解析
app.use(express.json());

connectDB();

app.use(morgan('dev'));

// 挂载路由节点 http://localhost:5000/api/v1/users
// app.use('/api/v1/users', users);
// app.use('/api/v1/userBids', userBids);
app.use('/api/v1/userEvents', userEvents);
app.use('/api/v1/userEventCounts', userEventCounts);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () =>
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on prot ${PORT}`
    )
);

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red.bold);
    // 关闭服务器 & 退出进程
    server.close(() => {
        process.exit(1);
    });
});
