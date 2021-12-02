const amqp = require("amqplib");
const amqpConfig = require("../configs/amqp.config");
const IbmService = require("../services/ibm.service");
const DeviceConstant = require("../constants/amqp.constant");

exports.amqpAddDevice = () => {
    return amqp
        .connect(amqpConfig.host)
        .then((con) => con.createChannel())
        .then((ch) => {
            console.log(amqpConfig.device_queue_name);
            ch.assertQueue(amqpConfig.device_queue_name).then(() => {
                ch.consume(amqpConfig.device_queue_name, (msg) => {
                    console.log("process add device.");
                    var message = JSON.parse(msg.content);
                    console.log(data);
                    var command = message.command;
                    var data = message.data;
                    var method = new Promise((resolve, reject) => {
                        return reject(new Error("haven't command."));
                    });

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