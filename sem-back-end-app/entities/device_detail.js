const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

/**
 * @swagger
 * components:
 *  schemas:
 *      DeviceDetail:
 *          type: object
 *          properties:
 *              _id:
 *                  type: objectId
 *              deviceId:
 *                  type: objectId
 *              aeraId:
 *                  type: objectId
 *              unitId:
 *                  type: objectId
 *              address:
 *                  type: string
 *              description:
 *                  type: string
 *              location:
 *                  type: mixed
 *              type:
 *                  type: string
 *              state:
 *                  type: mixed
 *              createdAt:
 *                  type: date
 *              updatedAt:
 *                  type: date
 *      
 */
const deviceDetailSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    deviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Device' },
    aeraId: { type: mongoose.Schema.Types.ObjectId, ref: 'Aera' },
    unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' },
    address: { type: String, required: true, maxLength: 255 },
    location: { type: mongoose.Schema.Types.Mixed },
    description: { type: String, maxLength: 255 },
    state: { type: mongoose.Schema.Types.Mixed },
    type: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = DeviceDetail = mongoose.model("DeviceDetail", deviceDetailSchema);