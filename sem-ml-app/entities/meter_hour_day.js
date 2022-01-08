const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


/**
 * @swagger
 * components:
 *  schemas:
 *      MeterHourDay:
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
 *      
 */
const meterHourDaySchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    deviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Device" },
    datetime: { type: Date },
    activePower: { type: Number }
});

module.exports = MeterHourDay = mongoose.model('MeterHourDay', meterHourDaySchema);