const Client = require("ibmiotf");
const mongoose = require("mongoose");
const ibmConfig = require("../configs/ibmiot.config");
const MeterPower = require("../entities/meter_power");
const DeviceDetail = require("../entities/device_detail");
const AmqpService = require("./rabbitmq.server.rpc.service");
const kue = require("kue");
const redisConfig = require("../configs/redis.config");

const appClientConfig = {
    org: ibmConfig.orgId,
    id: ibmConfig.appId,
    domain: ibmConfig.domain,
    "auth-key": ibmConfig.apiKey,
    "auth-token": ibmConfig.apiToken,
};


const jobs = kue.createQueue({
    redis: {
        host: redisConfig.REDIS_HOSTNAME,
        port: redisConfig.REDIS_PORT,
        auth: redisConfig.REDIS_PASSWORD,
    }
});
const appClient = new Client.IotfApplication(appClientConfig);
const deviceType = "monitor-device";
const connect = function() {
    appClient.connect();
    appClient.log.setLevel("trace");
    appClient.on("connect", function() {
        console.log("success");
        appClient.subscribeToDeviceEvents("monitor-device", "+", "+", "json");
        appClient.subscribeToDeviceStatus();
    });
};

const handleDeviceStatusEvents = () => {
    appClient.on("deviceStatus", function(deviceType, deviceId, payload, topic) {
        console.log(
            "Status device ::" +
            deviceType +
            ":" +
            deviceId +
            "với payload:" +
            payload
        );
        var data = JSON.parse(payload);
        var job = jobs.create("status_device", {
            deviceId: deviceId,
            data: data,
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
    });
};

const handleDeviceEvents = function() {
    appClient.on(
        "deviceEvent",
        function(deviceType, deviceId, eventType, format, payload) {
            console.log(
                "event from device ::" +
                deviceType +
                ": " +
                eventType +
                ": " +
                deviceId +
                ": " +
                payload
            );
            data = JSON.parse(payload);
            console.log(data);
            if (eventType === "send_meter") {
                var job = jobs.create("send_meter", {
                    deviceId: deviceId,
                    data: data,
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
            }
        }
    );
};

const processAddStatus = () => {
    jobs.process("status_device", 10, (job, done) => {
        var deviceId = job.data.deviceId;
        var data = job.data.data;
        DeviceDetail.findOneAndUpdate({ deviceId: deviceId }, { state: data })
            .then((result) => {
                console.log(result);
                console.log("update status device success");
                done();
            })
            .catch((err) => {
                console.log("update status device fail");
                console.log(err);
                done(new Error(err));
            });
    });
};

const processAddMeter = () => {
    jobs.process("send_meter", 10, (job, done) => {
        var deviceId = job.data.deviceId;
        var data = job.data.data;

        var hour = data.hour;

        var date = new Date();
        date.setHours(hour, 0, 0, 0);
        if (hour === 23) {
            date.setDate(date.getDate() - 1);
        }

        let meterPower = new MeterPower({
            _id: mongoose.Types.ObjectId(),
            deviceId: mongoose.Types.ObjectId(deviceId),
            dateTime: date,
            reactivePower: data.reactivePower,
            voltage: data.voltage,
            activePower: data.activePower,
            intensity: data.intensity,
        });

        meterPower
            .save()
            .then((newMeter) => {
                console.log(newMeter);
                if (hour === 23) {
                    AmqpService.sendMeter(newMeter)
                        .then((data) => {
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done(new Error(err));
                        });
                } else {
                    done();
                }

            })
            .catch((err) => {
                console.log(err);
                done(new Error(err));
            });
    });
};

const registerDevice = function(data) {
    var deviceId = data.deviceId;
    var token = data.token;
    var location = {
        longitude: String(data.longitude),
        latitude: String(data.latitude),
    };
    return new Promise((resolve, reject) => {
        appClient
            .registerDevice(deviceType, deviceId, token, {}, location, {})
            .then(
                function onSuccess(response) {
                    console.log("register device success");
                    console.log(response);

                    resolve(response);
                },
                function onError(err) {
                    console.log("register device failed");
                    console.log(err);
                    reject(err);
                }
            );
    });
};

const unregisterDevice = function(data) {
    var deviceId = data.deviceId;

    return new Promise((resolve, reject) => {
        appClient.unregisterDevice(deviceType, deviceId).then(
            function onSuccess(response) {
                console.log("unregister device success.");
                console.log(response);
                resolve(response);
            },
            function onError(err) {
                console.log("unregister device fail.");
                console.log(err);
                reject(err);
            }
        );
    });
};

const getDeviceConnectionLogs = function(data) {
    var deviceId = data.deviceId;

    return new Promise((resolve, reject) => {
        appClient.getDeviceConnectionLogs(deviceType, deviceId).then(
            function onSuccess(response) {
                console.log("getDeviceConnectionLogs device success.");
                console.log(response);
                resolve(response);
            },
            function onError(err) {
                console.log("getDeviceConnectionLogs device fail.");
                console.log(err);
                reject(err);
            }
        );
    });
};

const updateLocationDevice = (data) => {
    var location = { longitude: data.longitude, latitude: data.latitude };
    var deviceId = data.deviceId;
    return new Promise((resolve, reject) => {
        appClient.updateDeviceLocation(deviceType, deviceId, location).then(
            function onSuccess(response) {
                console.log("update device location success.");
                console.log(response);
                resolve(response);
            },
            function onError(err) {
                console.log("update device location fail.");
                console.log(err);
                reject(err);
            }
        );
    });
};

const getDiagnosticLog = (data) => {
    var deviceId = data.deviceId;
    return new Promise((resolve, reject) => {
        appClient.getAllDiagnosticLogs(deviceType, deviceId).then(
            function onSuccess(response) {
                console.log("get diagnostic logs success.");
                console.log(response);
                resolve(response);
            },
            function onError(err) {
                console.log("get diagnostic logs fail.");
                console.log(err);
                reject(err);
            }
        );
    });
};

const clearAllDiagnosticLogs = (data) => {
    var deviceId = data.deviceId;
    return new Promise((resolve, reject) => {
        appClient.clearAllDiagnosticLogs(deviceType, deviceId).then(
            function onSuccess(response) {
                console.log("clear diagnostic logs success.");
                console.log(response);
                resolve(response);
            },
            function onError(err) {
                console.log("clear diagnostic logs fail.");
                console.log(err);
                reject(err);
            }
        );
    });
};

const getActiveDevices = (data) => {
    startTime = data.startTime; //2021-01-01
    endTime = data.endTime; //2021-01-20

    return new Promise((resolve, reject) => {
        appClient.getActiveDevices(startTime, endTime, true).then(
            function onSuccess(response) {
                console.log("get active device success.");
                console.log(response);
                resolve(response);
            },
            function onError(err) {
                console.log("get active device fail.");
                console.error(err);
                reject(err);
            }
        );
    });
};

module.exports = {
    appClient: appClient,
    connect: connect,
    handleDeviceEvents: handleDeviceEvents,
    handleDeviceStatusEvents: handleDeviceStatusEvents,
    unregisterDevice: unregisterDevice,
    getDeviceConnectionLogs: getDeviceConnectionLogs,
    registerDevice: registerDevice,
    updateLocationDevice: updateLocationDevice,
    getDiagnosticLog: getDiagnosticLog,
    clearAllDiagnosticLogs: clearAllDiagnosticLogs,
    getDeviceConnectionLogs: getDeviceConnectionLogs,
    getActiveDevices: getActiveDevices,
    processAddMeter: processAddMeter,
    processAddStatus: processAddStatus,
};

// const ibmClientApp = function() {
//     appClient = new Client.IotfApplication(appClientConfig);

//     appClient.connect();

//     appClient.on("connect", function() {
//         console.log("success");
//         appClient.subscribeToDeviceEvents("monitor-device", "+", "+", "json");
//     });

//     appClient.on("deviceEvent", function(deviceType, deviceId, eventType, format, payload) {
//         console.log("event from device ::" + deviceType + ": " + deviceId + ": " + payload);
//     })

//     appClient.on("error", function(err) {
//         console.log("Error: " + err)
//         appClient.reConnect();
//     });

//     return appClient;

// }

// module.exports = ibmClientApp;