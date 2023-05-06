const nodemailer = require("nodemailer");
require("dotenv").config();
let password = process.env.GMAIL_PASSWORD;
let user = process.env.GMAIL_USER;

console.log(password);
console.log(user);
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: user,
        pass: password,
    },
});

function verifyConnection() {
    return new Promise((resolve, reject) => {
        transporter.verify(function (error, success) {
            if (error) {
                console.log("Verification failed!");
                console.log(error);
                reject(false);
            } else {
                console.log("Server is ready to take our messages");
                resolve(true);
            }
        });
    });
}

async function sendEmail(to, subject, text, html) {
    try {
        await verifyConnection();
    } catch (error) {
        return;
    }

    let mailOptions = {
        from: "DVOP Dealership",
        to: to,
        subject: subject,
        text: text,
        html: html,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("Message %s sent: %s", info.messageId, info.response);
    });
}

module.exports = {
    sendEmail,
};
