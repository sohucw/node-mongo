const mongoose = require('mongoose');

const UserEventCountSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: [true, '请填写owner']
    },
    amount: {
        type: Number,
        required: [true, '请填写amount']
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('UserEventCount', UserEventCountSchema);
