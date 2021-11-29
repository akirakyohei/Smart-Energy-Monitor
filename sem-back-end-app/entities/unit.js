const mongoose = require('mongoose');
const Permission = require('./permission');
mongoose.Promise = global.Promise;

/**
 * @swagger
 * components:
 *  schemas:
 *      Unit:
 *          type: object
 *          properties:
 *              _id:
 *                  type: objectId
 *              name:
 *                  type: string
 *              description:
 *                  type: string
 *              unit:
 *                  type: {}
 *              createdAt:
 *                  type: date
 *              updatedAt:
 *                  type: date
 *      
 */
const unitSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    name: { type: String, default: null, maxlength: 40, unique: true },
    description: { type: String, default: null, maxlength: 255 },
    unit: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = Unit = mongoose.model('Unit', unitSchema);