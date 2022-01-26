const amqp = require("amqplib");
const amqpConfig = require("../configs/amqp.config");
const spawn = require("child_process").spawn;
const mongoose = require("mongoose");
const MeterDayMonth = require("../entities/meter_day_month");
const MeterDayWeek = require("../entities/meter_day_week");
const MeterHourDay = require("../entities/meter_hour_day");
exports.amqpAddDevice = () => {
    return amqp
        .connect(amqpConfig.host)
        .then((con) => con.createChannel())
        .then((ch) => {
            console.log(amqpConfig.predict_queue_name);
            ch.assertQueue(amqpConfig.predict_queue_name).then(() => {
                ch.consume(amqpConfig.predict_queue_name, (msg) => {
                    console.log("process add device.");
                    var metter = JSON.parse(msg.content);
                    console.log(metter);
                    var endDate = new Date();
                    endDate.setDate(endDate.getDate() - 1);
                    var startDate = new Date();
                    startDate.setDate(endDate.getDate() - 30);
                    var data = getMeterPowerByDate(metter.deviceId, startDate, endDate);
                    const meterDayMonthPythonProcess = spawn("python", [
                        "../python-code/predict/Main_18_01_2022.py",
                        data,
                    ]);

                    meterDayMonthPythonProcess.stdout.on("data", (listMeter) => {
                        listMeter.map((item) => {
                            let meterDayMonth = {
                                _id: mongoose.Types.ObjectId(),
                                deviceId: metter.deviceId,
                                datetime: item.datetime,
                                activePower: item.activePower,
                            };
                            MeterDayMonth.findOneAndUpdate({ deviceId: metter.deviceId, datetime: item.datetime },
                                meterDayMonth, { upsert: true, new: true, runValidation: true },
                                (err, doc) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                }
                            );
                        });
                        console.log("add success");
                    });

                });
            });
        })
        .catch((err) => {
            console.error(err);
        });
};

const getMeterPowerByDate = (deviceId, startTime, endTime) => {
    if (!ObjectId.isValid(deviceId)) {
        return {};
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
            return listMeter;
        });
    } catch (err) {
        console.error(err);
        return {};
    }

};