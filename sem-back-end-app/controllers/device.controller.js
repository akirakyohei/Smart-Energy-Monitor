const Device = require("../entities/device");
const ObjectId = require('mongoose').Types.ObjectId;
const DeviceDetail = require("../entities/device_detail");
const AmqpService = require("../services/rabbitmq.client.rpc.service");
const User = require("../entities/user");
const Aera = require("../entities/area");
const Unit = require("../entities/unit");

const uuid = require("uuid");
exports.createDevice = async(req, res) => {
    let device = new Device({
        _id: ObjectId(),
        name: req.body.name,
        userId: req.body.userId,
        token: "",
    });

    if (!ObjectId.isValid(req.body.userId) || !ObjectId.isValid(req.body.unitId) || !ObjectId.isValid(req.body.aeraId)) {
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
        deviceId: device._id,
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
                            type: req.body.type,
                        });

                        deviceDetail.save().then((newDeviceDetail) => {

                            return res.status(201).json({
                                success: true,
                                message: 'Device created successfully',
                                device: {
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

//return:
// id
// username
// name
// status
// dateAdd
// aera
exports.getDevicePaginate = async(req, res) => {
    var perPage = Number(req.query.perPage);
    var page = Math.max(1, req.query.page);
    var count = await Device.count();
    if (count === 0) {
        return res.status(200).json({
            success: true,
            message: "get employee success",
            data: {
                page: page,
                perPage: perPage,
                pages: 0,
                device: []
            }
        });
    }
    var totalPage = Math.ceil(count / perPage);
    page = Math.min(page, totalPage);
    console.log(perPage);
    try {
        var listDevice = await Device.find()
            .select("_id userId name createdAt")
            .sort({
                createdAt: "asc"
            })
            .skip(perPage * (page - 1))
            .limit(perPage);


        var resultList = await Promise.all(listDevice.map(async(item) => {

            let user = await User.findOne({ _id: item.userId }).select("username");
            let detail = await DeviceDetail.findOne({ deviceId: item._id });
            let aera = await Aera.findOne({ _id: detail.aeraId }).select("name");
            var deviceResult = {
                id: item._id,
                own: user.username,
                userId: item.userId,
                name: item.name,
                state: detail.state,
                dateAdd: item.createdAt,
                aeraId: detail.aeraId,
                aeraName: aera.name,

            };
            console.log(deviceResult);
            return deviceResult;
        }));

        return res.status(200).json({
            success: true,
            message: "get device Ok",
            data: {
                page: page,
                pages: totalPage,
                perPage: perPage,
                devices: resultList
            }
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "get device list faild",
            error: err
        })
    }
}

exports.getDeviceDetail = async(req, res) => {

    var deviceId = req.params.id;

    if (!ObjectId.isValid(deviceId)) {
        res.status(400).json({
            success: false,
            message: "Bad request",
            error: "deviceId is not valid"
        });
        return;
    }



    console.log(deviceId);
    try {
        var device = await Device.findById(deviceId);
        let user = await User.findOne({ _id: device.userId }).select("username");
        let detail = await DeviceDetail.findOne({ deviceId: device._id });
        let aera = await Aera.findOne({ _id: detail.aeraId }).select("name");
        var deviceResult = {
            id: device._id,
            own: user.username,
            userId: device.userId,
            name: device.name,
            state: detail.state,
            dateAdd: device.createdAt,
            aeraId: detail.aeraId,
            aeraName: aera.name,
            address: detail.address,
            location: detail.location,
            description: detail.description,
            type: detail.type,
            unit: detail.unit

        };

        return res.status(200).json({
            success: true,
            message: "get device Ok",
            data: {
                device: deviceResult
            }
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "get device list faild",
            error: err
        })
    }


}

exports.getDeviceConnectionlog = async(req, res) => {
    var deviceId = req.params.id;

    if (!ObjectId.isValid(deviceId)) {
        return res.status(400).json({
            success: false,
            message: "get device connection log fail",
            error: "deviceId is not a valid"
        });
    }

    var dataS = {
        deviceId: deviceId,
    };
    console.log(dataS);
    AmqpService.sendGetDeviceConnectionLog(dataS)
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
                return res.status(200).json({
                    success: true,
                    message: 'get connection log success',
                    logs: d.data
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


}