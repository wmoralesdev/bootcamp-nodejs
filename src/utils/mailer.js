const sgMail = require('@sendgrid/mail')
const debug = require('debug')('bootcamp-nodejs-js:mailer');

sgMail.setApiKey(process.env.SENDGRID_KEY);

module.exports = async (mssg) => {
    const fullMssg = {
        ...mssg,
        from: process.env.SUPPORT_EMAIL,
    }

    await sgMail.send(fullMssg);
    debug(`Email sent to ${mssg.to}`)
}