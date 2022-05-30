const userService = require('../services/user.service');

exports.getById = async (req, res) => {
    const { id } = req.params;

    try {
        return res.status(200).json(await userService.getById(id));
    } catch (err) {
        // Err contendra statusCode si es un HttpError
        return res.status(err.statusCode() || 400).json({ message: err.message });
    }
};

exports.findByName = async (req, res) => {
    const { name } = req.query;

    try {
        return res.status(200).json(await userService.findByName(name));
    } catch (err) {
        // Err contendra statusCode si es un HttpError
        return res.status(err.statusCode() || 400).json({ message: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    const { page, limit } = req.query;

    try {
        return res.status(200).json(await userService.getAll(+page, +limit));
    } catch (err) {
        console.log(err);
        // Err contendra statusCode si es un HttpError
        return res.status(err.statusCode() || 400).json({ message: err.message });
    }
};

exports.getOwn = async (req, res) => {
    const { _id } = req.user;

    try {
        return res.status(200).json(await userService.getById(_id));
    } catch (err) {
        // Err contendra statusCode si es un HttpError
        return res.status(err.statusCode() || 400).json({ message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    const { _id } = req.user;

    try {
        const updatedUser = await userService.updateUser(_id, req.body);
        return res.status(200).json(updatedUser);
    } catch (err) {
        // Err contendra statusCode si es un HttpError
        return res.status(err.statusCode() || 400).json({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.body;

    try {
        await userService.deleteUser(id);
        return res.status(204).json();
    } catch (err) {
        // Err contendra statusCode si es un HttpError
        return res.status(err.statusCode() || 400).json({ message: err.message });
    }
};
