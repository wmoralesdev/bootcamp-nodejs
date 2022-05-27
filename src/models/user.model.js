const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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
        minlength: 8
    },
    image: String,
    role: {
        type: String,
        enum: ['user', 'admin', 'guest'],
        default: 'user'
    },
    recovery: {
        type: {
            token: String,
            url: String,
        }
    }
});

// Encriptar contra
userSchema.pre('save', async function (next) {
    const hashedPassword = await bcrypt.hash(this.password, +(process.env.SALT));

    this.password = hashedPassword;
    next();
});

module.exports = model('user', userSchema);