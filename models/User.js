const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        addr: {
            type: String,
            required: [true, '请填写addr'],
            unique: true, // 该字段不能重复
        },
        amount: {
            type: String,
            required: [true, '请填写amount'],
        },
        createAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true},
    }
);

// 配置virtual 定义虚拟字段
UserSchema.virtual('bids', {
    ref: 'UserBid', // 关联的模型
    localField: 'addr', // 内键,schema对应的模型User的addr
    foreignField: 'owner', // 外键,关联模型UserBid的owner字段
    justOne: false, // 只查询一条数据
});

module.exports = mongoose.model('User', UserSchema);
