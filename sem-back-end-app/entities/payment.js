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
 *              startDay:
 *                  type: date
 *              enDay:
 *                  type: date
 *              totalPower:
 *                  type: number
 *              bill:
 *                  type: number
 *              tax:
 *                  type: number
 *              totalBill:
 *                  type: number
 *              createdAt:
 *                  type: date
 *      
 */
const paymentSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    deviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Device' },
    startDay: { type: Date },
    endDay: { type: Date },
    totalPower: { type: Number },
    bill: { type: Number },
    tax: { type: Number },
    totalBill: { type: Number },
    createdAt: { type: Date, default: Date.now },
});

module.exports = Payment = mongoose.model("Payment", paymentSchema);