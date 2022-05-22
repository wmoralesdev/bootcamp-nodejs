const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

// Proceso de creacion de un token
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username });

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

exports.register = async (req, re) => {

}