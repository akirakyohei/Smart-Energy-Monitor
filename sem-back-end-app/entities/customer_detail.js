const mongoose = require('mongoose');
const User = require('./user');

mongoose.Promise = global.Promise;

const customerDetailSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    fullName: { type: String, default: null },
    address: { type: String, default: null },
    province: { type: String, default: null },
    phone: { type: String },
    district: { type: String },
    village: { type: String },
    image: { type: String },
    birthday: { type: Date, default: null },
    activeKey: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = CustomerDetail = mongoose.model('CustomerDetail', customerDetailSchema);