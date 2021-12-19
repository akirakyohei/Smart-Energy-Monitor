const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *          properties:
 *              _id:
 *                  type: objectId
 *              roleId:
 *                  type: objectId
 *              username:
 *                  type: string
 *              password:
 *                  type: string
 *              email:
 *                  type: string
 *              mobile:
 *                  type: string
 *              image:
 *                  type: string
 *              isAdmin:
 *                  type: boolean
 *              status:
 *                  type: boolean
 *              createdAt:
 *                  type: date
 *              updatedAt:
 *                  type: date
 *      
 */

const userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    username: { type: String, unique: true, required: true, maxlength: 20, trim: true },
    password: { type: String, required: true, minLength: 7 },
    email: {
        type: String,
        required: true,
        maxLength: 30,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({ error: 'Invalid email address.' })
            }
        }
    },
    image: { type: String },
    phone: { type: String, maxlength: 10, minlength: 10 },
    isAdmin: { type: Boolean, default: false },
    status: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, );
userSchema.statics.findByCredentials = async(username, password) => {
    const user = await User.findOne({ username: username });

    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' });
    }
    return user;
}

module.exports = User = mongoose.model('User', userSchema);