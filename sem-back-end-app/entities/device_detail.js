const mogoose = require('mogoose');

mongoose.Promise = global.Promise;

const deviceDetailSchema = new mongoose.Schema({
    _id: mongoose.Schema.type.ObjectId,
    deviceId: mongoose.Schema.type.ObjectId,
    areaId: mongoose.Schema.type.ObjectId,
    unitId: mongoose.Schema.type.ObjectId,
    address: { type: String, required: true, maxLength: 255 },
    description: { type: String, maxLength: 255 },
    state: { type: Number },
    type: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("DeviceDetail", deviceDetailSchema);