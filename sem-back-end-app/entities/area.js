const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

/**
 * @swagger
 * components:
 *  schemas:
 *      Aera:
 *          type: object
 *          required:
 *          properties:
 *              _id:
 *                  type: ObjectId
 *              name:
 *                  type: ObjectId
 *              description:
 *                  type: String
 *              status:
 *                  type: Boolean
 *              createdAt:
 *                  type: Date
 *              updatedAt:
 *                  type: Date
 *      
 */
const aeraSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    name: { type: String, required: true, maxLength: 255, unipue: true },
    description: { type: String, maxLength: 255 },
    status: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = Aera = mongoose.model('Aera', aeraSchema);