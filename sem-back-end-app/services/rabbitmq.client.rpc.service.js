const amqp = require("amqplib");
const { host, device_reply_queue_name, device_queue_name } = require("../configs/amqp.config");
const EventEmitter = require("events");
const uuid = require("uuid");


module.exports = AmqpService = class {
    static channel = null;

    static connectAmqpServer = () => {
        amqp
            .connect(host)
            .then((con) => con.createChannel())
            .then((ch) => {
                ch.assertQueue(device_reply_queue_name, { durable: false }).then((replyque) => {

                    ch.responseEmitter = new EventEmitter();
                    ch.responseEmitter.setMaxListeners(0);
                    ch.consume(replyque.queue, (msg) => ch.responseEmitter.emit(msg.properties.correlationId, msg.content), { noAck: true });
                    this.channel = ch;
                });
            });
    }

    static sendAddDevice = (message) => {
        return new Promise((resolve) => {
            console.log("send")
            const correlationId = uuid.v4();
            this.channel.responseEmitter.once(correlationId, resolve);
            console.log("send")
            this.channel.sendToQueue(device_queue_name, Buffer.from(message, "utf-8"), { correlationId, replyTo: device_reply_queue_name })
            console.log("send")
        });
    };
};