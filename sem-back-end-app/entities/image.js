const mongoose = require('mongoose');
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
 *                  type: string
 *              pic:
 *                  type: object
 *                  properties:
 *                      data:
 *                          type: buffer
 *                      contentType:
 *                          type: string
 *      
 */
const imageSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    name: { type: String, unique: true, default: null, maxlength: 100 },
    pic: { data: Buffer, contentType: String },
});

module.exports = Image = mongoose.model('Image', imageSchema);