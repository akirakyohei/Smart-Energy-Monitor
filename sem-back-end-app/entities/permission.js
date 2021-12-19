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
 *      
 */
const permissionSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    name: { type: String, unique: true, default: null, maxlength: 30 },
    description: { type: String, default: null, maxlength: 255 },
});

module.exports = Permission = mongoose.model('Permission', permissionSchema);