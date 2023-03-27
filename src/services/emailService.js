const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    //? pool: true,
    host: "smtp.example.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: "username",
        pass: "password",
    },
});

function verifyConnection() {
    let result = false;
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
            result = false;
        } else {
            console.log("Server is ready to take our messages");
            result = true;
        }
    });
    return result;
}

function sendEmail(to, subject, text, html) {
    if (verifyConnection() === false) {
        return;
    }

    let mailOptions = {
        from: 'sender@sender.com',
        to: to,
        subject: subject,
        text: text,
        html: html
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}

module.exports = {
    sendEmail
}
