const userModel = require('../models/user.model');
const userService = require('../services/user.service');

exports.createUser = async (req, res) => {
    const { body } = req;

    try {
        // Logica de negocio
        const existingUser = await userModel.findOne({ email: body.email });

        // Fail fast (tomar en cuenta los escenarios especiales primero)
        if (existingUser)
            throw { message: 'User already exists' };

        const newUser = new userModel(body);
        await newUser.save();

        return res.status(201).json(newUser);
    }
    catch(err) {
        // Logica personalizada para los errores
        return res.status(400).send(err);
    }
}

exports.getById = async (req, res) => {
    const { params } = req;
    
    try {
        const user = await userModel.findOne({ _id: params.id });

        return res.status(user ? 200 : 404).json(user);
    }
    catch(err) {
        // Logica personalizada para los errores
        return res.status(400).send(err);
    }
}

exports.findByName = async (req, res) => {
    const { query } = req;
    
    try {
        const users = await userModel.find({ name: query.name });

        return res.status(users ? 200 : 404).json(users);
    }
    catch(err) {
        // Logica personalizada para los errores
        return res.status(400).send(err);
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const { query } = req;
        const { page, limit } = query;
        
        const count = await userModel.countDocuments();
        const totalPages = Math.ceil(count / limit);
        const hasPrev = !(page <= 1);
        const hasNext = page < totalPages;
        const nextPage = hasNext ?
            `${process.env.HOST}/users?page=${(+page) + 1}&limit=${limit}` : null;
        const prevPage = hasPrev ?
            `${process.env.HOST}/users?page=${(+page) - 1}&limit=${limit}` : null;

        const users = await userModel
            .find()
            .skip(((+page) - 1) * limit)
            .limit(+(limit));

        return res.status(200).json({
            count,
            prevPage,
            nextPage,
            data: users
        });
    }
    catch(err) {
        // Logica personalizada para los errores
        return res.status(err.status ?? 400).send(err);
    }
}

exports.getOwn = async (req, res) => {
    const me = await userService.getById(req.user._id);

    return res.status(200).json(me);
}