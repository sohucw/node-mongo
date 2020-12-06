const mongoose = require('mongoose');

const UserBidSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: [true, '请填写owner'],
    },
    live: {
        type: Boolean,
        required: [true, '请填写live'],
    },
    index: {
        type: String,
        required: [true, '请填写index'],
    },
    token: {
        type: String,
        required: [true, '请填写token'],
    },
    amount: {
        type: String,
        required: [true, '请填写amount'],
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('UserBid', UserBidSchema);
