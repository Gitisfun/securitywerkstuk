const nodemailer = require('nodemailer');

const emailservice = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
    },
});

module.exports = emailservice; 