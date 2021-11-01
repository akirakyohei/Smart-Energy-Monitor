const mogoose = require('mogoose');

mongoose.Promise = global.Promise;

const aeraSchema = new mongoose.Schema({
    _id: mongoose.Schema.Type.ObjectId,
    name: { type: String, required: true, maxLength: 255 },
    description: { type: String, maxLength: 255 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Aera', aeraSchema);