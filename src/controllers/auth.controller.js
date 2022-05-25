const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const mailer = require('../utils/mailer');

// Proceso de creacion de un token
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user)
            throw { status: 404, message: 'User not found' };

        const validPass = password === user.password;

        if (!validPass)
            throw { status: 401, message: 'Invalid password' };

        const payload = { _id: user._id };
        
        const token = jwt.sign(payload, process.env.JWT_SECRET);

        return res.status(200).json({ token });
    }
    catch(err) {
        // Logica personalizada para los errores
        return res.status(err.status ?? 400).send(err);
    }
}

exports.register = async (req, res) => {
    const { name, lastName, email, password } = req.body;

    try {
        const isEmailAvilable = !(await userModel.findOne({ email }));

        if (!isEmailAvilable)
            throw { status: 400, message: 'Email already in use' };

        const newUser = new userModel({
            name,
            lastName,
            email,
            password,
        });

        await newUser.save();

        const mssg = {
            to: email,
            subject: 'Welcome',
            text: 'Welcome to Bootcamp-NodeJS'
        }

        await mailer(mssg);

        return res.status(204).json();
    }
    catch(err) {
        // Logica personalizada para los errores
        return res.status(err.status ?? 400).send(err);
    }
}

// Solicitar el cambio de contraseña
exports.requestPassword = async (req, res) => {
    try {
        const { email } = req.query;
        const user = await userModel.findOne({ email });

        if(!user)
            throw { status: 404, message: 'Could\'nt find a user with that email' };

        const payload = { _id: user._id };
        const token = jwt.sign(payload, process.env.JWT_RECOVERY_SECRET);

        user.recovery = {
            token: token,
            url: `${process.env.HOST}/auth/reset/${token}`
        }

        await user.save();

        const mssg = {
            to: email,
            subject: 'Password recovery',
            text: `To reset your password please visit the following link: ${user.recovery.url}`
        }

        await mailer(mssg);

        return res.status(200).json({
            link: user.recovery.url,
        });
    }
    catch(err) {
        // Logica personalizada para los errores
        return res.status(err.status ?? 400).send(err);
    }
}

// Realizar el cambio de contraseña
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await userModel.findOne({ "recovery.token": token });

        if(!user)
            throw { status: 404, message: 'Could\'nt find a user with that token' };

        user.password = password;
        user.recovery = null;
        await user.save();

        return res.status(200).json({ message: 'Password updated' });
    }
    catch(err) {
        console.log(err);
        return res.status(err.status ?? 400).send(err);
    }
}