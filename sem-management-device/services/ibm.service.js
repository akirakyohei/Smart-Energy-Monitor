const Client = require('ibmiotf');
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
        console.log("event from device ::" + deviceType + ": " + deviceId + ": " + payload);

        if (eventType === "send-meter") {
            let metterPower = new MeterPower();
            meterPowr.deviceId = deviceId;
            meterPower.dateTime = payload.dateTime;
            meterPower.rectivePower = payload.rectivePower;
            meterPower.voltage = payload.voltage;
            meterPower.intensity = payload.intensity;

            meterPower.save().then((newMeter) => {
                console.log(newMeter);
            }).catch((err) => {
                console.log(err);

            });
        }

    })
}

const registerDevice = function(data) {

    var type = "monitor-device";
    var deviceId = data.deviceId;
    var token = data.token;
    var location = { "longitude": String(data.longitude), "latitude": String(data.latitude) };
    return new Promise((resolve, reject) => {
        appClient.registerDevice(type, deviceId, token, {}, location, {}).then(function onSuccess(response) {
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
    var deviceType = "monitor-device";
    var deviceId = data.deviceId;

    appClient.unregisterDevice(deviceType, deviceId).then(function onSuccess(response) {
        console.log("unregister device success.");
        console.log(response);
    }, function onError(err) {
        console.log("unregister device fail.");
        console.log(err);
    })
}


const getDeviceConnectionLogs = function(data) {
    var deviceType = "monitor-device";
    var deviceId = data.deviceId;

    appClient.getDeviceConnectionLogs(deviceType, deviceId).then(function onSuccess(response) {
        console.log("getDeviceConnectionLogs device success.");
        console.log(response);
    }, function onError(err) {
        console.log("getDeviceConnectionLogs device fail.");
        console.log(err);
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