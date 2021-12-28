const MeterPower = require("../entities/meter_power");
const ObjectId = require("mongoose").Types.ObjectId;

exports.getMeterPowerByHour = async(req, res) => {
    var deviceId = req.params.id;
    var startTime = new Date(req.query.startTime);
    var endTime = new Date(req.query.endTime);
    if (!ObjectId.isValid(deviceId)) {
        return res.status(400).json({
            success: false,
            message: "get mett power by hour fail",
            error: "deviceId is not valid",
        });
    }

    try {
        var listMeter = await MeterPower.find({
                deviceId: deviceId,
                dateTime: { $gte: startTime, $lte: endTime },
            })
            .select("-_id dateTime activePower reactivePower voltage intensity")
            .sort({ dateTime: "asc" });

        listMeter.map((item, index, array) => {
            if (array[index + 1] === undefined) {
                return;
            }
            var milliseconds =
                array[index + 1].dateTime.getTime() - array[index].dateTime.getTime();
            var hours = Math.ceil(milliseconds / (1000 * 60 * 60));
            if (!hours === 1) {
                var date = new Date(arr[i].dateTime);
                date.setHours(date.getHours() + 1);
                listMeter.splice(i + 1, 0, {
                    dateTime: date,
                    activePower: 0,
                    reactivePower: 0,
                    voltage: 0,
                    intensity: 0,
                });
            }
        });

        if (listMeter[0].dateTime.getTime() > startTime.getTime()) {
            var milliseconds = listMeter[0].dateTime.getTime() - startTime.getTime();
            var hours = Math.ceil(milliseconds / (1000 * 60 * 60));

            for (var i = 0; i < hours; i++) {
                var date = new Date(listMeter[0].dateTime);
                date.setHours(date.getHours() - 1);
                listMeter.unshift({
                    dateTime: date,
                    activePower: 0,
                    reactivePower: 0,
                    voltage: 0,
                    intensity: 0,
                });
            }
        }

        if (
            listMeter[listMeter.length - 1].dateTime.getTime() < endTime.getTime()
        ) {
            var milliseconds =
                endTime.getTime() - listMeter[listMeter.length - 1].dateTime.getTime();
            var hours = Math.ceil(milliseconds / (1000 * 60 * 60));

            for (var i = 0; i < hours; i++) {
                var date = new Date(listMeter[listMeter.length - 1].dateTime);
                date.setHours(date.getHours() + 1);
                listMeter.push({
                    dateTime: date,
                    activePower: 0,
                    reactivePower: 0,
                    voltage: 0,
                    intensity: 0,
                });
            }
        }

        return res.status(200).json({
            success: true,
            message: "get meter power succes",
            data: listMeter,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again.",
            error: err.message,
        });
        return;
    }
};

exports.getMeterPowerByDate = async(req, res) => {
    var deviceId = req.params.id;
    var startTime = new Date(req.query.startTime);
    var endTime = new Date(req.query.endTime);
    if (!ObjectId.isValid(deviceId)) {
        return res.status(400).json({
            success: false,
            message: "get mett power by hour fail",
            error: "deviceId is not valid",
        });
    }

    try {
        var pipeline = [{
                $match: {
                    deviceId: new ObjectId(deviceId),
                },
            },
            {
                $addFields: {
                    date: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$dateTime",
                        },
                    },
                },
            },
            {
                $group: {
                    _id: "$date",
                    totalActivePower: {
                        $sum: "$activePower",
                    },
                    totalReactivePower: {
                        $sum: "$reactivePower",
                    },
                    totalIntensity: {
                        $sum: "$intensity",
                    },
                },
            },
            {
                $project: {
                    date: {
                        $dateFromString: {
                            dateString: "$_id",
                        },
                    },
                    totalActivePower: {
                        $round: ["$totalActivePower", 3],
                    },
                    totalReactivePower: {
                        $round: ["$totalReactivePower", 3],
                    },
                    totalIntensity: {
                        $round: ["$totalIntensity", 3],
                    },
                    _id: 0,
                },
            },
        ];

        MeterPower.aggregate(pipeline).exec((err, listMeter) => {
            if (err) {
                console.log(err);
            }

            listMeter.map((item, index, array) => {
                if (array[index + 1] === undefined) {
                    return;
                }
                var milliseconds =
                    array[index + 1].date.getTime() - array[index].date.getTime();
                var days = Math.ceil(milliseconds / (1000 * 60 * 60 * 24));
                if (!days === 1) {
                    var date = new Date(arr[i].date);
                    date.setDate(date.getDate() + 1);
                    listMeter.splice(i + 1, 0, {
                        date: date,
                        activePower: 0,
                        reactivePower: 0,
                        voltage: 0,
                        intensity: 0,
                    });
                }
            });

            if (listMeter[0].date.getTime() > startTime.getTime()) {
                var milliseconds = listMeter[0].date.getTime() - startTime.getTime();
                var days = Math.ceil(milliseconds / (1000 * 60 * 60 * 24));

                for (var i = 0; i < days; i++) {
                    var date = new Date(listMeter[0].date);
                    date.setDate(date.getDate() - 1);
                    listMeter.unshift({
                        date: date,
                        activePower: 0,
                        reactivePower: 0,
                        voltage: 0,
                        intensity: 0,
                    });
                }
            }

            if (listMeter[listMeter.length - 1].date.getTime() < endTime.getTime()) {
                var milliseconds =
                    endTime.getTime() - listMeter[listMeter.length - 1].date.getTime();
                var days = Math.ceil(milliseconds / (1000 * 60 * 60 * 24));

                for (var i = 0; i < days; i++) {
                    var date = new Date(listMeter[listMeter.length - 1].date);
                    date.setDate(date.getDate() + 1);
                    listMeter.push({
                        date: date,
                        activePower: 0,
                        reactivePower: 0,
                        voltage: 0,
                        intensity: 0,
                    });
                }
            }

            return res.status(200).json({
                success: true,
                message: "get meter power succes",
                data: listMeter,
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again.",
            error: err.message,
        });
        return;
    }
};