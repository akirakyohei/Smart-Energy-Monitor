const Device = require("../entities/device");
const ObjectId = require('mongoose').Types.ObjectId;
const DeviceDetail = require("../entities/device_detail");
const AmqpService = require("../services/rabbitmq.client.rpc.service");
const User = require("../entities/user");
const Aera = require("../entities/area");
const Unit = require("../entities/unit");

const uuid = require("uuid");
const Constrant = require("../constrants/constrant");
exports.createDevice = async(req, res) => {
    let device = new Device({
        _id: ObjectId(),
        name: req.body.name,
        userId: req.body.userId,
        mqttID: "",
        token: "",
    });

    if (!ObjectId.isValid(req.body.userId) || !ObjectId.isValid(req.body.userId) || !ObjectId.isValid(req.body.userId)) {
        res.status(400).json({
            success: false,
            message: "Bad request",
            error: "UserId or AeraId or UnitId is not valid"
        });
        return;
    }


    var isUser = await User.exists({ _id: ObjectId(req.body.userId) });
    if (!isUser) {
        res.status(400).json({
            success: false,
            message: "Bad request",
            error: "User not exist!"
        });
        return;
    }

    var isAera = await Aera.exists({ _id: ObjectId(req.body.aeraId) });
    if (!isAera) {
        res.status(400).json({
            success: false,
            message: "Bad request",
            error: "Aera not exist!"
        });
        return;
    };

    var isUnit = await Unit.exists({ _id: ObjectId(req.body.unitId) }).then(result => { console.log(result); return result; }).catch(err => { console.log(err); return false; });
    if (!isUnit) {
        res.status(400).json({
            success: false,
            message: "Bad request",
            error: "Unit not exist!"
        });
        return;
    }

    var dataRegister = {
        deviceId: uuid.v4(),
        token: uuid.v4(),
        longitude: req.body.location.long,
        latitude: req.body.location.lat,
    };
    console.log(dataRegister);
    var dataRegisterStrr = JSON.stringify(dataRegister);
    console.log(dataRegisterStrr);
    AmqpService.sendAddDevice(dataRegisterStrr)
        .then((data) => {
            console.log(data);
            var d = JSON.parse(data);
            console.log(d);
            if (!d.success) {
                res.status(500).json({
                    success: false,
                    message: "Server error. Please try again.",
                    error: d.err,
                });
                return;
            } else {
                console.log(d.data);
                device.mqttID = d.data.deviceId;
                device.token = d.data.token;
                device
                    .save()
                    .then((newDevice) => {

                        deviceDetail = new DeviceDetail({
                            _id: ObjectId(),
                            deviceId: newDevice._id,
                            aeraId: req.body.aeraId,
                            unitId: req.body.unitId,
                            address: req.body.address,
                            location: req.body.location,
                            description: req.body.description,
                            state: Constrant.stateDevice.DEVICE_SUCCESS,
                            type: req.body.type,
                        });

                        deviceDetail.save().then((newDeviceDetail) => {

                            return res.status(201).json({
                                success: true,
                                message: 'Device created successfully',
                                device: {
                                    mqttId: newDevice.mqttID,
                                    token: newDevice.token,
                                    aeraId: newDeviceDetail.aeraId,
                                    unitId: newDeviceDetail.unitId,
                                    address: newDeviceDetail.address,
                                    location: newDeviceDetail.location,
                                    type: newDeviceDetail.type
                                }
                            });
                        }).catch(err => {
                            console.log(err);
                            res.status(500).json({
                                success: false,
                                message: "Server error. Please try again.",
                                error: err.message,
                            });
                        })


                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).json({
                            success: false,
                            message: "Server error. Please try again.",
                            error: err.message,
                        });
                    });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Server error. Please try again.",
                error: err.message,
            });
        });
};