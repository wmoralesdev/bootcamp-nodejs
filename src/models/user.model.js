const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    image: String,
    role: {
        type: String,
        enum: ['user', 'admin', 'guest'],
        default: 'user',
    },
    recovery: {
        type: {
            token: String,
            url: String,
        },
    },
});

userSchema.pre('save', async function hashPassword(next) {
    const hashedPassword = await bcrypt.hash(this.password, +(process.env.SALT));

    this.password = hashedPassword;
    next();
});

userSchema.methods.validPassword = async function validatePassword(password) {
    const valid = await bcrypt.compare(password, this.password);
    return valid;
};

userSchema.methods.generateJwt = function generateJwt() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

userSchema.methods.generateRecoveryJwt = function generateRecoveryJwt() {
    return jwt.sign({ id: this._id }, process.env.JWT_RECOVERY_SECRET, { expiresIn: '15m' });
};

userSchema.methods.validRecoveryJwt = function validateRecoveryJwt(token) {
    return jwt.verify(token, process.env.JWT_RECOVERY_SECRET);
};

module.exports = model('user', userSchema);
