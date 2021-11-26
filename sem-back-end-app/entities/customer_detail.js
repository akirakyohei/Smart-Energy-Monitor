const mongoose = require('mongoose');

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
 *              province:
 *                  type: string
 *              district:
 *                  type: string
 *              village:
 *                  type: string
 *              phone:
 *                  type: string
 *              address:
 *                  type: string
 *              birthday:
 *                  type: date
 *              activeKey:
 *                  type: string
 *              createdAt:
 *                  type: date
 *              updatedAt:
 *                  type: date
 *      
 */
const customerDetailSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    fullName: { type: String, default: null },
    address: { type: String, default: null },
    province: { type: String, default: null },
    phone: { type: String },
    district: { type: String },
    village: { type: String },
    birthday: { type: Date, default: null },
    activeKey: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = CustomerDetail = mongoose.model('CustomerDetail', customerDetailSchema);