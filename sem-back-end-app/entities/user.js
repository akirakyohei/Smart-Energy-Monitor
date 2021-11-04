const mogoose = require('mogoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

mogoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Type.ObjectId,
    roleId: { type: mongoose.Schema.Type.ObjectId, ref: 'Role' },
    username: { type: String, required: true, maxlength: 20, trim: true },
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
    isAdmin: { type: Boolean, default: false },
    status: { type: boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
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

export default mongoose.model('User', userSchema);