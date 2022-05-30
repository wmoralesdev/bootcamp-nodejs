const HttpError = require('../misc/HttpError');

exports.authorizeAdmin = function authorize(req, res, next) {
    const { user } = req;

    if (user.role !== 'admin') throw new HttpError('Forbidden', 403);

    next();
};
