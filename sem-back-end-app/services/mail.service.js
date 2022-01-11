const nodemailer = require("nodemailer");
const mailConfig = require("../configs/mail.config");
const fs = require("fs");
const ejs = require("ejs");
const { convert } = require("html-to-text");
const juice = require("juice");
const handlebars = require("handlebars");
const kue = require("kue");
const redisConfig = require("../configs/redis.config");

const jobs = kue.createQueue({
    redis: {
        host: redisConfig.REDIS_HOSTNAME,
        port: redisConfig.REDIS_PORT,
        auth: redisConfig.REDIS_PASSWORD,
    }
});
exports.sendMailSimple = (to, subject, text, html) => {
    var job = jobs.create("send_mail_simple", {
        to: to,
        subject: subject,
        text: text,
        html: html,
    });
    job
        .on("complete", function() {
            console.log(" Job complete");
        })
        .on("failed", function() {
            console.log(" Job failed");
        })
        .on("progress", function(progress) {
            process.stdout.write(
                "\r  job #" + job.id + " " + progress + "% complete"
            );
        });

    job.save();
};
exports.processSendMailSimple = () => {
    jobs.process("send_mail_simple", 20, (job, done) => {
        var transporter = nodemailer.createTransport({
            service: mailConfig.service,
            auth: {
                user: mailConfig.username,
                pass: mailConfig.password,
            },
        });
        var mainOptions = {
            from: mailConfig.username,
            to: job.data.to,
            subject: job.data.subject,
            text: job.data.text,
            html: job.data.html,
        };

        transporter.sendMail(mainOptions, function(err, info) {
            if (err) {
                console.error(err);
                done(new Error(err));
            } else {
                console.log("Message sent:" + info.response);
                done(info.response);
            }
        });
    });
};

const readHTMLFile = function(path, callback) {
    fs.readFile(path, { encoding: "utf-8" }, function(err, html) {
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
            pass: mailConfig.password,
        },
    });
    console.log("transporter");
    readHTMLFile(
        __dirname + "/../public/template/mail/verifyMail.html",
        (err, html) => {
            if (err) {
                console.log(err);
            }
            console.log("transporter");
            var template = handlebars.compile(html);
            var replacements = {
                url: url,
            };
            var htmlToSend = template(replacements);
            console.log("transporter");
            var mailOptions = {
                from: mailConfig.username,
                to: to,
                subject: "Xác nhận tài khoản.",
                html: htmlToSend,
            };
            console.log("transporter");
            transporter.sendMail(mailOptions, function(err, result) {
                if (err) {
                    console.log(error);
                    callback(err);
                }
            });
        }
    );
};

exports.sendMailPayment = (mailRequest) => {
    var job = jobs.create("send_mail_payment", {
        mailRequest: mailRequest,
    });
    job
        .on("complete", function() {
            console.log(" Job complete");
        })
        .on("failed", function() {
            console.log(" Job failed");
        })
        .on("progress", function(progress) {
            process.stdout.write(
                "\r  job #" + job.id + " " + progress + "% complete"
            );
        });

    job.save();
};

exports.processSendMailPayment = () => {
    jobs.process("send_mail_payment", 20, (job, done) => {
        try {
            sendMailPaymentJob(job.data.mailRequest);
        } catch (err) {
            console.log(err);
            done(err)
        }

    });
};

const sendMailPaymentJob = (mailRequest) => {
    var transporter = nodemailer.createTransport({
        service: mailConfig.service,
        auth: {
            user: mailConfig.username,
            pass: mailConfig.password,
        },
    });
    var urlTemplate = __dirname + "/../public/template/mail/payment.html";
    if (fs.existsSync(urlTemplate)) {


        const template = fs.readFileSync(urlTemplate, "utf-8");
        const html = ejs.render(template, mailRequest);
        const htmlWithStyleInlined = juice(html);
        var mailOptions = {
            from: mailConfig.username,
            to: mailRequest.email,
            subject: mailRequest.content,
            html: htmlWithStyleInlined
        };
        console.log("transporter");
        transporter.sendMail(mailOptions, function(err, result) {
            if (err) {
                console.log(error);
                throw err;
            }
        });
    }
};