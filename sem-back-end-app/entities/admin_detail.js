const mongoose = require('mongoose');
const validator = require('validator');

mongoose.Promise = global.Promise;

/**
 * @swagger
 * components:
 *  schemas:
 *      CustomerDetail:
 *          type: object
 *          properties:
 *              _id:
 *                  type: objectId
 *              userId:
 *                  type: objectId
 *              firstName:
 *                  type: string
 *              lastName:
 *                  type: string
 *              fullName:
 *                  type: string
 *              address:
 *                  type: string
 *              birthday:
 *                  type: date
 *              createdAt:
 *                  type: date
 *              updatedAt:
 *                  type: date
 *      
 */
const adminDetailSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    adminId: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: true, maxLength: 10 },
    lastName: { type: String, required: true, maxLength: 10 },
    fullName: { type: String, required: true, maxLength: 30 },
    birthday: { type: Date },
    aera: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Aera' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = AdminDetail = mongoose.model("AdminDetail", adminDetailSchema);