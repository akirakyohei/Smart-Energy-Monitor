const amqp = require("amqplib");
const { host, reply_device_queue_name, device_queue_name } = require("../configs/amqp.config");
const EventEmitter = require("events");
const uuid = require("uuid");
const DeviceConstant = require("../constants/amqp.constant");


module.exports = AmqpService = class {
    static channel = null;

    static connectAmqpServer = () => {
        amqp
            .connect(host)
            .then((con) => con.createChannel())
            .then((ch) => {
                ch.assertQueue(reply_device_queue_name, { durable: false }).then((replyque) => {

                    ch.responseEmitter = new EventEmitter();
                    ch.responseEmitter.setMaxListeners(0);
                    ch.consume(replyque.queue, (msg) => ch.responseEmitter.emit(msg.properties.correlationId, msg.content), { noAck: true });
                    this.channel = ch;
                });
            });
    }


    static sendMethodDevice = (command, data) => {
        console.log(command);
        return new Promise((resolve) => {
            console.log("send")
            const correlationId = uuid.v4();
            this.channel.responseEmitter.once(correlationId, resolve);
            console.log("send")
            var message = {
                command: command,
                data: data
            }
            console.log(message)
            var messStr = JSON.stringify(message);
            this.channel.sendToQueue(device_queue_name, Buffer.from(messStr, "utf-8"), { correlationId, replyTo: reply_device_queue_name })
            console.log("send")
        })
    }

    static sendAddDevice = (data) => {
        return this.sendMethodDevice(DeviceConstant.ADD_DEVICE, data);
    };

    static sendRemoveDevice = (data) => {
        return this.sendMethodDevice(DeviceConstant.REMOVE_DEVICE, data);
    };

    static sendGetDeviceConnectionLog = (data) => {
        return this.sendMethodDevice(DeviceConstant.GET_DEVICE_CONNECTION_LOG, data);
    };

    static sendUpdateLocationDevice = (data) => {
        return this.sendMethodDevice(DeviceConstant.UPDATE_LOCATION_DEVICE, data);
    };

    static sendGetDiagnosticLog = (data) => {
        return this.sendMethodDevice(DeviceConstant.GET_DIAGNOSTIC_LOG, data);
    };

    static sendClearAllDiagnosticLogs = (data) => {
        return this.sendMethodDevice(DeviceConstant.CLEAR_ALL_DIAGNOSTIC_LOGS, data);
    };

    static sendGetActiveDevices = (data) => {
        return this.sendMethodDevice(DeviceConstant.GET_ACTIVE_DEVICES, data);
    };
};