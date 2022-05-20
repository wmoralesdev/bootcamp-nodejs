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
        minlength: 8
    },
    recovery: {
        type: {
            token: String,
            url: String,
        }
    }
});

module.exports = model('user', userSchema);