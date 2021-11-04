const mongoose = require('mongoose');
const Permission = require('./permission');
mongoose.Promise = global.Promise;

const roleSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, default: null, maxlength: 40 },
    description: { type: String, default: null, maxlength: 255 },
    permission: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
    status: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Role', roleSchema);