const nodemailer = require('nodemailer');
const mailConfig = require('../configs/mail.config');
const fs = require('fs');
const handlebars = require('handlebars');


exports.sendMailSimple = (to, subject, text, html) => {
    var transporter = nodemailer.createTransport({
        service: mailConfig.service,
        auth: {
            user: mailConfig.username,
            pass: mailConfig.password
        }
    });
    var mainOptions = {
        from: mailConfig.username,
        to: to,
        subject: subject,
        text: text,
        html: html
    }

    transporter.sendMail(mainOptions, function(err, info) {
        if (err) {
            console.error(err);
        } else {
            console.log("Message sent:" + info.response);
        }
    })
};

const readHTMLFile = function(path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function(err, html) {
        if (err) {
            callback(err);
            throw err;
        } else {
            callback(null, html);
        }
    });
};

exports.sendMailVerify = (to, url) => {
    var transporter = nodemailer.createTransport({
        service: mailConfig.service,
        auth: {
            user: mailConfig.username,
            pass: mailConfig.password
        }
    });
    console.log("transporter")
    readHTMLFile(__dirname + "/../public/template/mail/verifyMail.html", (err, html) => {
        if (err) {
            console.log(err);
        }
        console.log("transporter")
        var template = handlebars.compile(html);
        var replacements = {
            url: url
        }
        var htmlToSend = template(replacements);
        console.log("transporter")
        var mailOptions = {
            from: mailConfig.username,
            to: to,
            subject: "Xác nhận tài khoản.",
            html: htmlToSend
        }
        console.log("transporter")
        transporter.sendMail(mailOptions, function(err, result) {
            if (err) {
                console.log(error);
                callback(err);
            }
        })
    });
}