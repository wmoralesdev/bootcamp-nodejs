const mailer = require('../utils/mailer');

exports.sendWelcomeEmail = async (to) => {
    const mssg = {
        to,
        subject: 'Welcome',
        text: 'Welcome to Bootcamp-NodeJS'
    }

    await mailer(mssg);
}

exports.sendRecoveryEmail = async (to, url) => {
    const mssg = {
        to,
        subject: 'Password recovery',
        text: `To reset your password please visit the following link: ${url}`
    }

    await mailer(mssg);
}