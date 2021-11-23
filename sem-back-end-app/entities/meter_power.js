const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

/**
 * @swagger
 * components:
 *  schemas:
 *      MeterPower:
 *          type: object
 *          properties:
 *              _id:
 *                  type: objectId
 *              deviceId:
 *                  type: objectId
 *              dateTime:
 *                  type: date
 *              activePower:
 *                  type: number
 *              rectivePower:
 *                  type: number
 *              voltage:
 *                  type: number
 *              intensity:
 *                  type: number
 *      
 */

const meterPowerSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    deviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Device' },
    dateTime: { type: Date, required: true },
    activePower: { type: Number, default: 0 },
    rectivePower: { type: Number, default: 0 },
    voltage: { type: Number, default: 0 },
    intensity: { type: Number, default: 0 },
}, );

module.exports = MeterPower = mongoose.model("MeterPower", meterPowerSchema);