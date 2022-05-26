// Repositorios: tienen el contacto directo con la db (obtener las entidades puras)
const userModel = require('../models/user.model');

exports.get = async (searchCriteria) => {
    return await userModel.findOne(searchCriteria);
}

exports.find = async (findCriteria) => {
    return await userModel.find(findCriteria);
}

exports.create = async(user) => {
    return await (new userModel(user)).save();
}