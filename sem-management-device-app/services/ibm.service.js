const Client = require('ibmiotf');
const mongoose = require('mongoose');
const ibmConfig = require('../configs/ibmiot.config');
const MeterPower = require('../entities/meter_power');
const appClientConfig = {
    "org": ibmConfig.orgId,
    "id": ibmConfig.appId,
    "domain": ibmConfig.domain,
    "auth-key": ibmConfig.apiKey,
    "auth-token": ibmConfig.apiToken

}


const appClient = new Client.IotfApplication(appClientConfig);
const deviceType = "monitor-device";
const connect = function() {
    appClient.connect();
    appClient.log.setLevel('trace');
    appClient.on("connect", function() {
        console.log("success");
        appClient.subscribeToDeviceEvents("monitor-device", "+", "+", "json");
    });
}

const handleDeviceEvents = function() {
    appClient.on("deviceEvent", function(deviceType, deviceId, eventType, format, payload) {
        console.log("event from device ::" + deviceType + ": " + eventType + ": " + deviceId + ": " + payload);
        data = JSON.parse(payload);
        console.log(data);
        if (eventType === "send_meter") {
            let meterPower = new MeterPower({
                _id: mongoose.Types.ObjectId(),
                deviceId: mongoose.Types.ObjectId(deviceId),
                dateTime: Date.now(),
                reactivePower: data.reactive_power,
                voltage: data.voltage,
                activePower: data.active_power,
                intensity: data.intensity
            });
            meterPower.save().then((newMeter) => {
                console.log(newMeter);
            }).catch((err) => {
                console.log(err);

            });
        }

    })
}

const registerDevice = function(data) {

    var deviceId = data.deviceId;
    var token = data.token;
    var location = { "longitude": String(data.longitude), "latitude": String(data.latitude) };
    return new Promise((resolve, reject) => {
        appClient.registerDevice(deviceType, deviceId, token, {}, location, {}).then(function onSuccess(response) {
            console.log("register device success");
            console.log(response);

            resolve(response);
        }, function onError(err) {
            console.log("register device failed");
            console.log(err)
            reject(err);
        });
    })
}

const unregisterDevice = function(data) {
    var deviceId = data.deviceId;

    return new Promise((resolve, reject) => {
        appClient.unregisterDevice(deviceType, deviceId).then(function onSuccess(response) {
            console.log("unregister device success.");
            console.log(response);
            resolve(response);
        }, function onError(err) {
            console.log("unregister device fail.");
            console.log(err);
            reject(err);
        })
    });
}


const getDeviceConnectionLogs = function(data) {
    var deviceId = data.deviceId;

    return new Promise((resolve, reject) => {
        appClient.getDeviceConnectionLogs(deviceType, deviceId).then(function onSuccess(response) {
            console.log("getDeviceConnectionLogs device success.");
            console.log(response);
            resolve(response);
        }, function onError(err) {
            console.log("getDeviceConnectionLogs device fail.");
            console.log(err);
            reject(err);
        });
    });
}

const updateLocationDevice = (data) => {
    var location = { "longitude": data.longitude, "latitude": data.latitude };
    var deviceId = data.deviceId;
    return new Promise((resolve, reject) => {
        appClient.updateDeviceLocation(deviceType, deviceId, location).then(function onSuccess(response) {
            console.log("update device location success.");
            console.log(response);
            resolve(response);
        }, function onError(err) {
            console.log("update device location fail.");
            console.log(err);
            reject(err);
        });
    });
}

const getDiagnosticLogs = (data) => {
    var deviceId = data.deviceId;
    return new Promise((resolve, reject) => {
        appClient.getAllDiagnosticLogs(deviceType, deviceId).then(function onSuccess(response) {
            console.log("get diagnostic logs success.");
            console.log(response);
            resolve(response);
        }, function onError(err) {
            console.log("get diagnostic logs fail.");
            console.log(err);
            reject(err);
        });
    });
}

const clearAllDiagnosticLogs = (data) => {
    var deviceId = data.deviceId;
    return new Promise((resolve, reject) => {
        appClient.clearAllDiagnosticLogs(deviceType, deviceId).then(function onSuccess(response) {
            console.log("clear diagnostic logs success.");
            console.log(response);
            resolve(response);
        }, function onError(err) {
            console.log("clear diagnostic logs fail.");
            console.log(err);
            reject(err);
        });
    });
}

const getActiveDevices = (data) => {
    startTime = data.startTime; //2021-01-01
    endTime = data.endTime; //2021-01-20

    return appClient.getActiveDevices(startTime, endTime).then(function onSuccess(response) {
        console.log("get active device success.");
        console.log(response);
        resolve(response);
    }, function onError(err) {
        console.log("get active device fail.");
        console.log(err);
        reject(err);
    });
}



module.exports = {
    appClient: appClient,
    connect: connect,
    handleDeviceEvents: handleDeviceEvents,
    unregisterDevice: unregisterDevice,
    getDeviceConnectionLogs: getDeviceConnectionLogs,
    registerDevice: registerDevice
}

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