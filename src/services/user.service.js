const HttpError = require('../misc/HttpError');
const userRepository = require('../repositories/user.repo');

exports.getById = async (id) => {
    const user = await userRepository.get({ _id: id });

    return user;
};

exports.getByEmail = async (email) => {
    const user = await userRepository.get({ email });

    return user;
};

exports.findByName = async (name) => {
    const users = await userRepository.find({
        name: {
            $regex: new RegExp(name, 'i'),
        },
    });

    return users;
};

exports.getAll = async (page, limit) => {
    const total = await userRepository.count();

    const paginatedInfo = {
        total,
        prevPage: !(page <= 1)
            ? `${process.env.HOST}/users?page=${page + 1}&limit=${limit}` : null,
        nextPage: page < total
            ? `${process.env.HOST}/users?page=${page - 1}&limit=${limit}` : null,
        data: await userRepository.getAll(page, limit),
    };

    return paginatedInfo;
};

exports.login = async ({ email, password }) => {
    const user = await userRepository.get({ email });

    if (!user) throw new HttpError('User not found', 404);

    if (!user.validPassword(password)) throw new HttpError('Wrong password', 401);

    return user.generateJwt();
};

exports.handleRecoverRequest = async (email) => {
    let user = await userRepository.get({ email });

    if (!user) throw new HttpError('User not found', 404);

    const token = user.generateRecoveryJwt();

    user = await userRepository.update(user._id, {
        recovery: {
            token,
            url: `${process.env.HOST}/auth/reset/${token}`,
        },
    });

    return { email, url: user.recovery.url };
};

exports.handleResetPassword = async (token, newPassword) => {
    let user = await userRepository.get({ 'recovery.token': token });

    if (!user || !user.validRecoveryJwt(token)) throw new HttpError('Invalid token', 401);

    user = await userRepository.update(
        { _id: user._id },
        { password: newPassword, recovery: null },
    );
};

exports.createUser = async ({
    name, lastName, email, password, image,
}) => {
    const isNew = await userRepository.get({ email }) == null;

    if (!isNew) throw new HttpError('User already exists', 400);

    const newUser = await userRepository.create({
        name, lastName, email, password, image,
    });

    return newUser;
};

exports.updateUser = async (id, {
    name, lastName, password, image, recovery,
}) => {
    const user = await userRepository.get({ _id: id });

    if (!user) throw new HttpError('User not found', 404);

    const newFields = {
        name: name || user.name,
        lastName: lastName || user.lastName,
        password: password || user.password,
        image: image || user.image,
        recovery: recovery || null,
    };

    const updatedFields = await userRepository.update({ _id: id }, newFields);
    return updatedFields;
};

exports.deleteUser = async (id) => {
    const count = await userRepository.delete(id);

    if (count < 0) throw new HttpError('User not found', 404);
};
