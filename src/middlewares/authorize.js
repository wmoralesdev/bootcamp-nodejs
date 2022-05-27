exports.authorizeAdmin = function (req, res, next) {
    const { user } = req;

    if (user.role != 'admin')
        throw { status: 403, message: 'Forbidden' };

    next();
}