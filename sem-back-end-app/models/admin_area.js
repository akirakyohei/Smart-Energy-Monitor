const mogoose = require('mogoose');

mogoose.Promise = global.Promise;

const adminAeraSchema = new mongoose.Schema({
    _id: mongoose.Schema.Type.ObjectId,
    adminId: mongoose.Schema.Type.ObjectId,
    aeraId: mongoose.Schema.Type.ObjectId,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('AdminAera', adminAeraSchema);