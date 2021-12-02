const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

/**
 * @swagger
 * components:
 *  schemas:
 *      Device:
 *          type: object
 *          required:
 *          properties:
 *              _id:
 *                  type: objectId
 *              userId:
 *                  type: objectId
 *              name:
 *                  type: string
 *              token:
 *                  type: string
 *              createdAt:
 *                  type: date
 *              updatedAt:
 *                  type: date
 *      
 */
const deviceSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, default: null, maxlength: 50 },
    token: { type: String, default: null, maxlength: 50 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }

});

module.exports = Device = mongoose.model("Device", deviceSchema);