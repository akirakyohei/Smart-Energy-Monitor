const mogoose = require('mogoose');
const User = require('./user');

mogoose.Promise = global.Promise;

const customerDetailSchema = new mongoose.Schema({
    _id: mongoose.Schema.Type.ObjectId,
    userId: { type: mongoose.Schema.Type.ObjectId, ref: 'User' },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    fullName: { type: String, default: null },
    address: { type: String, default: null },
    province: { type: String, default: null },
    phone: { type: String },
    district: { type: String },
    village: { type: String },
    image: { type: String },
    birthDay: { type: Date, default: null },
    activeKey: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('CustomerDetail', customerDetailSchema);