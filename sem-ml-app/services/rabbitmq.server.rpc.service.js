const amqp = require("amqplib");
const amqpConfig = require("../configs/amqp.config");
const IbmService = require("../services/ibm.service");
exports.amqpAddDevice = () => {
    return amqp
        .connect(amqpConfig.host)
        .then((con) => con.createChannel())
        .then((ch) => {
            console.log(amqpConfig.device_queue_name);
            ch.assertQueue(amqpConfig.device_queue_name).then(() => {
                ch.consume(amqpConfig.device_queue_name, (msg) => {
                    console.log("process add device.");
                    var data = JSON.parse(msg.content);
                    console.log(data);
                    IbmService.registerDevice(data)
                        .then((result) => {
                            console.log(data);
                            var outMessage = { success: true, data: data };
                            var out = JSON.stringify(outMessage);
                            ch.sendToQueue(msg.properties.replyTo, Buffer.from(out, "utf8"), {
                                correlationId: msg.properties.correlationId,
                            });
                            ch.ack(msg);
                        })
                        .catch((err) => {

                            var msgErr = { succes: false, err: err.data.message };
                            var out = JSON.stringify(msgErr);
                            ch.sendToQueue(msg.properties.replyTo, Buffer.from(out, "utf8"), {
                                correlationId: msg.properties.correlationId,
                            });
                            ch.ack(msg);
                        });
                });
            });
        })
        .catch((err) => {
            console.error(err);
        });
};