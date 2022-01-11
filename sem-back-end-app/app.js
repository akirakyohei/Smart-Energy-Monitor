const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");
const db = require("./configs/db.config");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./configs/swagger.config");
const open = require("open");
const AmqpService = require("./services/rabbitmq.client.rpc.service");
const MailService = require("./services/mail.service");
const Aes = require("./helpers/aes.cipher.helper");
const kue = require("kue");
// const livereload = require('livereload');
// const connectLiveReload = require('connect-livereload');

// api
const role = require("./routes/role.route");
const auth = require("./routes/auth.route");
const aera = require("./routes/aera.route");
const permission = require("./routes/permission.route");
const unit = require("./routes/unit.route");
const device = require("./routes/device.route");
const image = require("./routes/image.route");
const user = require("./routes/user.route");
const meter = require("./routes/meterPower.route");
const payment = require("./routes/payment.route");

const app = express();
var corsOptions = {
    origin: ["http://localhost:3000", "*"],
};

// const liveReloadServer = livereload.createServer();
// liveReloadServer.server.once("connection", () => {
//     setTimeout(() => {
//         liveReloadServer.refresh("/");
//     }, 100);
// });
// app.use(connectLiveReload());

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//
mongoose.connect(db.url, (err) => {
    if (err) return console.log("error", err);
    console.log(
        "MongoDB connection --Ready state is:",
        mongoose.connection.readyState
    );
});

//
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//

app.use("/api/auth", auth);
app.use("/api/permission", [], permission);
app.use("/api/role", [], role);
app.use("/api/aera", [], aera);
app.use("/api/unit", [], unit);
app.use("/api/device", [], device);
app.use("/api/img", [], image);
app.use("/api/user", [], user);
app.use("/api/meter", [], meter);
app.use("/api/payment", [], payment);

app.use("/api/mail", (req, res) => {
    // var userInfo = {
    //     id: "619daa0d800ed15c6392973c",
    //     date: Date.now(),
    // };

    // var userInfoStr = JSON.stringify(userInfo);
    // console.log(userInfoStr);
    // var cipherUser = Aes.encrypt(userInfoStr);
    // const url = 'http://localhost:8080/api/auth/verify/' + encodeURI(cipherUser);
    // console.log("sendmail")
    // MailService.sendMailVerify("huydong.hoanam@gmail.com", url);
    // console.log("return mail")
    var mailRequest = {
        aeraName: "test",
        fullName: "ha van doi",
        address: "ha noi",
        village: "ljdfk",
        district: "kdjnfkvjkd",
        province: "kjdlfk",
        phone: "098548757",
        email: "huydong.hoanam@gmail.com",
        deviceName: "kjnldfkv",
        unitName: "kjdfnkvjdf",
        paymentId: "930483954857493",
        content: "thanh toan hoa don",
        power: 100,
        sum: 100000,
        payDetail: [
            { level: 50, unit: 1450, price: 1000 },
            { level: 50, unit: 1680, price: 103945 },
        ],
        tax: 20349,
        total: 39489458,
        totalBywords: "kjdfkjvsdlks",
        exportBy: "kjdfsd",
        exportPhone: "ldfms",
        exportDate: new Date().toLocaleDateString("en-US"),
    };
    MailService.sendMailPayment(mailRequest);
    console.log("return mail");
    return res.status(200).json({ mess: "ok" });
});

AmqpService.connectAmqpServer();
MailService.processSendMailPayment();

app.use(kue.app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, function() {
    console.log(`Example app listening on port ${PORT}!`);
    console.log(`http://localhost:${PORT}/docs`);
});

// open(`http://localhost:${PORT}/docs`);
// open(`http://localhost:${PORT}/docs`);