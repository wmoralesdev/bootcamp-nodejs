const mailer = require('../utils/mailer');

exports.sendWelcomeEmail = async (to, image) => {
    const mssg = {
        to,
        subject: 'Welcome',
        text: 'Welcome to Bootcamp-NodeJS',
        html: `
            <div style="display: flex; flex-flow: row nowrap; justify-content: center; aligin-items: center;">
                <p style="font-size: 18px; font-weight: 700; color: #4c3150;">Welcome to Bootcamp-NodeJS</p>
                <img src=${image} style="height: 150px; width: 150px; border-radius: 100%;" />
            </div>
        `,
    };

    await mailer(mssg);
};

exports.sendRecoveryEmail = async (to, url) => {
    const mssg = {
        to,
        subject: 'Password recovery',
        text: `To reset your password please visit the following link: ${url}`,
    };

    await mailer(mssg);
};
