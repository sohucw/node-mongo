const mongoose = require('mongoose');
const UserEventCount = require('./UserEventCount.js');
const UserEventSchema = new mongoose.Schema({
    address: {
        type: String,
        required: [true, '请填写address']
        // unique: true, // 该字段不能重复
    },
    blockHash: {
        type: String,
        required: [true, '请填写blockHash']
    },
    blockNumber: {
        type: Number,
        required: [true, '请填写blockNumber']
    },
    logIndex: {
        type: Number,
        required: [true, '请填写logIndex']
    },
    removed: {
        type: Boolean,
        required: [true, '请填写removed']
    },
    transactionHash: {
        type: String,
        required: [true, '请填写transactionHash'],
        unique: true // 该字段不能重复
    },
    transactionIndex: {
        type: Number,
        required: [true, '请填写transactionIndex']
    },
    transactionLogIndex: {
        type: String,
        required: [true, '请填写transactionLogIndex']
    },
    type: {
        type: String,
        required: [true, '请填写type']
    },
    id: {
        type: String,
        required: [true, '请填写id']
    },
    returnValues: {
        // type: Object,
        // required: [true, '请填写returnValues'],
        previousOwner: {
            type: String
        },
        newOwner: {
            type: String
        },
        owner: {
            type: String
        },
        index: {
            type: String
        },
        token: {
            type: String
        },
        amount: {
            type: String
        }
    },
    event: {
        type: String,
        required: [true, '请填写event']
    },
    signature: {
        type: String,
        required: [true, '请填写signature']
    },
    raw: {
        data: {
            type: String
        },
        topics: {
            type: [String]
        }
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

// 配置前置钩子
// UserEventSchema.pre('save', async function (next) {
//     next();
// });

// UserEventSchema.pre('remove', async function (next) {
//     console.log('UserEventSchema pre remove :');
//     next();
// });
// UserEventSchema.pre('deleteMany', async function (next) {
//     console.log('UserEventSchema pre deleteMany :');
//     next();
// });

module.exports = mongoose.model('UserEvent', UserEventSchema);
