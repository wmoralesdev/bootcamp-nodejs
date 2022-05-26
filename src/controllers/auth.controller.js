const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const mailService = require('../services/mail.service');

// Proceso de creacion de un token
exports.login = async (req, res) => {
    try {
        const token = await userService.login(req.body);

        return res.status(token ? 200 : 404).json({ token });
    }
    catch(err) {
        // Logica personalizada para los errores
        return res.status(err.status ?? 400).send({err});
    }
}

exports.register = async (req, res) => {
    try {
        const newUser = await userService.createUser(req.body);
        await mailService.sendWelcomeEmail(newUser.email);

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

        // 3. Buscar un usuario
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

        await mailService.sendRecoveryEmail(user.email, user.recovery.url);

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

        // 4. Buscar un usuario
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
