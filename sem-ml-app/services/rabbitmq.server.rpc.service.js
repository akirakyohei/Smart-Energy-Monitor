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
                    var data = JSON.parse(msg.content);
                    console.log(data);

                    const meterDayMonthPythonProcess = spawn("python", [
                        "../python-code/predict/metter_day_of_month.py",
                        data,
                    ]);
                    const meterDayWeekPythonProcess = spawn("python", [
                        "../python-code/predict/metter_day_of_week.py",
                        data,
                    ]);
                    const meterHourDayPythonProcess = spawn("python", [
                        "../python-code/predict/metter_hour_of_day.py",
                        data,
                    ]);

                    meterDayMonthPythonProcess.stdout.on("data", (listMeter) => {
                        listMeter.map((item) => {
                            let meterDayMonth = {
                                _id: mongoose.Types.ObjectId(),
                                deviceId: data.deviceId,
                                datetime: item.datetime,
                                activePower: item.activePower,
                            };
                            MeterDayMonth.findOneAndUpdate({ deviceId: data.deviceId, datetime: item.datetime },
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

                    meterDayWeekPythonProcess.stdout.on("data", (listMeter) => {
                        listMeter.map((item) => {
                            let meterDayWeek = {
                                _id: mongoose.Types.ObjectId(),
                                deviceId: data.deviceId,
                                datetime: item.datetime,
                                activePower: item.activePower,
                            };
                            MeterDayWeek.findOneAndUpdate({ deviceId: data.deviceId, datetime: item.datetime },
                                meterDayWeek, { upsert: true, new: true, runValidation: true },
                                (err, doc) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                }
                            );
                        });
                        console.log("add success");
                    });

                    meterHourDayPythonProcess.stdout.on("data", (listMeter) => {
                        listMeter.map((item) => {
                            let meterHourDay = {
                                _id: mongoose.Types.ObjectId(),
                                deviceId: data.deviceId,
                                datetime: item.datetime,
                                activePower: item.activePower,
                            };
                            MeterHourDay.findOneAndUpdate({ deviceId: data.deviceId, datetime: item.datetime },
                                meterHourDay, { upsert: true, new: true, runValidation: true },
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