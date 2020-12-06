const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config({
    path: './config/config.env'
});

const User = require('./models/User.js');
const UserBid = require('./models/UserBid.js');
const UserEvent = require('./models/UserEvent.js');
const UserEventCount = require('./models/UserEventCount.js');

const {createUserEventCounts} = require('./controllers/userEventCounts');

// 连接数据库
mongoose.connect(process.env.NET_MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const users = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);
const userBids = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/userBids.json`, 'utf-8')
);
const userEvents = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/userEvents.json`, 'utf-8')
);

// 导入数据到mongodb数据库
const importData = async () => {
    try {
        await User.create(users);
        await UserBid.create(userBids);
        await UserEvent.create(userEvents);
        await createUserEventCounts(userEvents);
        console.log('数据存储成功'.green.inverse);
        process.exit();
    } catch (error) {
        console.log(error);
    }
};

// 删除数据库中的数据
const deleteData = async () => {
    try {
        await User.deleteMany();
        await UserBid.deleteMany();
        await UserEvent.deleteMany();
        await UserEventCount.deleteMany();
        console.log('数据删除成功'.red.inverse);
        process.exit();
    } catch (error) {
        console.log(error);
    }
};

console.log('process.argv', process.argv);
if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}
