const mongoose = require('mongoose');
const Role = require('./role');

mongoose.Promise = global.Promise;
/**
 * @swagger
 * components:
 *  schemas:
 *      Permission:
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
const permissionSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, default: null, maxlength: 30 },
    description: { type: String, default: null, maxlength: 255 },
    status: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

exports = mongoose.model('Permission', permissionSchema);