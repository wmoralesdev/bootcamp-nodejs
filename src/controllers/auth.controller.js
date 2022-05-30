const userService = require('../services/user.service');
const mailService = require('../services/mail.service');

// Proceso de creacion de un token
exports.login = async (req, res) => {
    try {
        return res.status(200).json({ token: await userService.login(req.body) });
    } catch (err) {
        // Err contendra statusCode si es un HttpError
        return res.status(err.statusCode() || 400).json({ message: err.message });
    }
};

// Creacion de un usuario (a traves de la registro)
exports.register = async (req, res) => {
    try {
        const user = await userService.createUser({ ...req.body, image: req.file.location });
        await mailService.sendWelcomeEmail(user.email, user.image);

        return res.status(201).json(user);
    } catch (err) {
        // Err contendra statusCode si es un HttpError
        return res.status(err.statusCode() || 400).json({ message: err.message });
    }
};

// Solicitar el cambio de contraseña
exports.requestPassword = async (req, res) => {
    try {
        const { email } = req.query;
        const { url: recoveryUrl } = await userService.handleRecoverRequest(email);

        await mailService.sendRecoveryEmail(email, recoveryUrl);

        return res.status(200).json({ link: recoveryUrl });
    } catch (err) {
        // Err contendra statusCode si es un HttpError
        return res.status(err.statusCode() || 400).json({ message: err.message });
    }
};

// Realizar el cambio de contraseña
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        await userService.handleResetPassword(token, password);

        return res.status(200).json({ message: 'Password updated' });
    } catch (err) {
        // Err contendra statusCode si es un HttpError
        return res.status(err.statusCode() || 400).json({ message: err.message });
    }
};
