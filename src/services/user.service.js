const repo = require('../repositories/user.repo');
const { signToken } = require('../utils/jwt');

exports.getByEmail = async (email) => {
    const user = await repo.get({ email });

    return user;
}

exports.login = async ({ email, password }) => {
    const user = await repo.get({ email });

    console.log(user);

    if (user.password !== password)
        throw 'Wrong password';

    return signToken({ _id: user._id });
}

exports.getById = async (id) => {
    const user = await repo.get({ _id: id });

    return user;
}

exports.findByName = async (name) => {
    const users = await repo.find({ name: name.toLowerCase() });

    return users;
}

exports.createUser = async ({ name, lastName, email, password }) => {
    const isNew = await repo.get({ email }) == null;

    if(!isNew)
        return null;

    const newUser = await repo.create({ name, lastName, email, password });

    return newUser;
}