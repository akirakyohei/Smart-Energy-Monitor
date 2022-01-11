const amqp = require("amqplib");
const amqpConfig = require("../configs/amqp.config");
const IbmService = require("../services/ibm.service");
const DeviceConstant = require("../constants/amqp.constant");

module.exports = AmqpService = class {
    static channel = null;

    static connectAmqpServer = () => {
        amqp
            .connect(amqpConfig.host)
            .then(conn => conn.createChannel())
            .then((ch) => {
                console.log(amqpConfig.device_queue_name);
                ch.assertQueue(amqpConfig.device_queue_name).then(() => {
                    ch.consume(amqpConfig.device_queue_name, (msg) => {
                        console.log("process add device.");
                        var message = JSON.parse(msg.content);
                        var command = message.command;
                        var data = message.data;
                        console.log(message);
                        var method = new Promise((resolve, reject) => {
                            return reject(new Error("haven't command."));
                        });
                        console.log(command);
                        switch (command) {
                            case DeviceConstant.ADD_DEVICE:
                                method = IbmService.registerDevice(data);
                                break;
                            case DeviceConstant.REMOVE_DEVICE:
                                method = IbmService.unregisterDevice(data);
                                break;
                            case DeviceConstant.GET_DEVICE_CONNECTION_LOG:
                                method = IbmService.getDeviceConnectionLogs(data);
                                break;
                            case DeviceConstant.UPDATE_LOCATION_DEVICE:
                                method = IbmService.updateLocationDevice(data);
                                break;
                            case DeviceConstant.GET_ACTIVE_DEVICES:
                                method = IbmService.getActiveDevices(data);
                                break;
                            case DeviceConstant.CLEAR_ALL_DIAGNOSTIC_LOGS:
                                method = IbmService.clearAllDiagnosticLogs(data);
                                break;
                            case DeviceConstant.GET_DIAGNOSTIC_LOG:
                                method = IbmService.getDiagnosticLogs(data);
                                break;
                        }

                        method
                            .then((result) => {
                                console.log(result);
                                var outMessage = { success: true, data: result };
                                var out = JSON.stringify(outMessage);
                                console.log(out);
                                ch.sendToQueue(
                                    msg.properties.replyTo,
                                    Buffer.from(out, "utf8"), {
                                        correlationId: msg.properties.correlationId,
                                    }
                                );
                                ch.ack(msg);
                            })
                            .catch((err) => {
                                var msgErr = { succes: false, err: err.data.message };
                                var out = JSON.stringify(msgErr);
                                ch.sendToQueue(
                                    msg.properties.replyTo,
                                    Buffer.from(out, "utf8"), {
                                        correlationId: msg.properties.correlationId,
                                    }
                                );
                                ch.ack(msg);
                            });
                    });
                });
                this.channel = ch;
            })
            .catch((err) => {
                console.error(err);
            });
    };

    static sendMeter = (data) => {
        return new Promise((resolve, reject) => {
            try {
                var message = {
                    data: data,
                };
                console.log(message);
                var messStr = JSON.stringify(message);
                const correlationId = uuid.v4();
                this.channel.sendToQueue(
                    amqpConfig.predict_queue_name,
                    Buffer.from(messStr, "utf-8"), { correlationId }
                );
                resolve({ message: 'success' });
                console.log("send");
            } catch (err) {
                reject(err);
            }
        });
    };
};