const jwt = require('jsonwebtoken');

exports.signToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return token;
}

exports.signTokenForRecovery = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_RECOVERY_SECRET);

    return token;
}

exports.verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

exports.verifyTokenForRecovery = (token) => {
    return jwt.verify(token, process.env.JWT_RECOVERY_SECRET);
}