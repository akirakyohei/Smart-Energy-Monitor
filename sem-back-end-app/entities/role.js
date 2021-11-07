const mongoose = require('mongoose');
const Permission = require('./permission');
mongoose.Promise = global.Promise;

/**
 * @swagger
 * components:
 *  schemas:
 *      Role:
 *          type: object
 *          required:
 *          properties:
 *              _id:
 *                  type: objectId
 *              name:
 *                  type: objectId
 *              description:
 *                  type: string
 *              permission:
 *                  type: objectId[]
 *              status:
 *                  type: boolean
 *              createdAt:
 *                  type: date
 *              updatedAt:
 *                  type: date
 *      
 */
const roleSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, default: null, maxlength: 40 },
    description: { type: String, default: null, maxlength: 255 },
    permission: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
    status: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Role', roleSchema);