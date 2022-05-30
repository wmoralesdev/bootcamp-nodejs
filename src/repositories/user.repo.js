// Repositorios: tienen el contacto directo con la db (obtener las entidades puras)
const userModel = require('../models/user.model');

exports.get = async (criteria) => await userModel.findOne(criteria);

exports.find = async (criteria) => await userModel.find(criteria);

exports.create = async (user) => await (new userModel(user)).save();

exports.update = async (criteria, user) => await userModel.findOneAndUpdate(criteria, user);

exports.delete = async (id) => await userModel.deleteOne({ _id: id });

exports.count = async () => await userModel.countDocuments();

exports.getAll = async (page, limit) => await userModel.find()
    .skip((page - 1) * limit).limit(limit);
