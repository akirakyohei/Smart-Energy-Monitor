const mongoose = require('mongoose');
const validator = require('validator');

mongoose.Promise = global.Promise;

const adminDetailSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    adminId: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: true, maxLength: 10 },
    lastName: { type: String, required: true, maxLength: 10 },
    fullName: { type: String, required: true, maxLength: 30 },
    birthDay: { type: Date },
    image: { type: String, maxLength: 255 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("AdminDetail", adminDetailSchema);