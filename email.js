require('dotenv').config();
const nodemailer = require('nodemailer');
const newChapters = require('./new-chapters');
const helpers = require('./helpers');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
    }
});

const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_DESTINATION_ADRESS,
    subject: 'Manga chapters available',
    text: ''
};

const send = (newChapters) => {
    mailOptions.text = helpers.transformObjectIntoString(newChapters);
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(`New manga found, json file sent to: ${mailOptions.to}`);
        }
    });
};


module.exports = {
    send,
};