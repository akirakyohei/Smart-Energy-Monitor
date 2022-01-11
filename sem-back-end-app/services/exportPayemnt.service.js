const kue = require("kue");
const ObjectId = require("mongoose").Types.ObjectId;
const { calMoneyPay } = require("../helpers/calculate.hepler.js");
const VNnum2words = require("vn-num2words");
const Payment = require("../entities/payment.js");
const MailService = require("./mail.service");
const redisConfig = require("../configs/redis.config");

const jobs = kue.createQueue({
    redis: {
        host: redisConfig.REDIS_HOSTNAME,
        port: redisConfig.REDIS_PORT,
        auth: redisConfig.REDIS_PASSWORD,
    }
});

exports.exportPayment = (data) => {
    data = {
        aeras: data.aeras,
        startDay: data.startDay,
        endDay: data.endDay,
        exportBy: data.exportBy,
        exportPhone: data.exportPhone
    };
    var job = jobs.create("export_payment", data);
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
};

exports.processExportPayment = () => {
    jobs.process("export_payment", 10, (job, done) => {
        var data = job.data;
        try {
            var pipeline = [{
                    $lookup: {
                        from: "devicedetails",
                        localField: "deviceId",
                        foreignField: "deviceId",
                        as: "device",
                    },
                },
                {
                    $match: {
                        "device.aeraId": { $in: data.aeras },
                    },
                },
                {
                    $match: {
                        dateTime: {
                            $gte: data.startDay,
                            $lt: data.endDay,
                        },
                    },
                },
                {
                    $group: {
                        _id: "$deviceId",
                        totalActivePower: {
                            $sum: "$activePower",
                        },
                        totalReactivePower: {
                            $sum: "$reactivePower",
                        },
                        totalIntensity: {
                            $sum: "$intensity",
                        },
                        device: {
                            $first: "$device",
                        },
                    },
                },
                {
                    $lookup: {
                        from: "units",
                        localField: "device.unitId",
                        foreignField: "_id",
                        as: "unit",
                    },
                },
                {
                    $lookup: {
                        from: "aeras",
                        localField: "device.aeraId",
                        foreignField: "_id",
                        as: "aeras",
                    },
                },
                {
                    $lookup: {
                        from: "devices",
                        localField: "device.deviceId",
                        foreignField: "_id",
                        as: "device",
                    },
                },
                {
                    $lookup: {
                        from: "customerdetails",
                        localField: "device.userId",
                        foreignField: "userId",
                        as: "customer",
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "device.userId",
                        foreignField: "_id",
                        as: "userMail",
                    },
                },
                {
                    $project: {
                        deviceId: "$_id",
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
                        startDay: data.startDay,
                        endDay: data.endDay,
                        customer: "$customer",
                        unit: "$unit",
                        deviceName: "$device.name",
                        email: "$userMail.email",
                        aeraName: "$aeras.name",
                        phone: "$userMail.phone",
                    },
                },
            ];

            MeterPower.aggregate(pipeline).exec((err, listMeter) => {
                if (err) {
                    console.error(err);
                    done(err);
                }
                listMeter.map((item) => {
                    var payDetail,
                        power,
                        sum,
                        tax,
                        total = calMoneyPay(item.uint.uint, item.totalActivePower);
                    var totalBywords = VNnum2words(total);
                    let payment = new Payment({
                        _id: ObjectId(),
                        deviceId: item.deviceId,
                        startDay: data.startDay,
                        endDay: data.endDay,
                        totalPower: power,
                        bill: sum,
                        tax: tax,
                        totalBill: total,
                        createdAt: new Date(),
                    });

                    payment
                        .save()
                        .then((newPayment) => {
                            var mailRequest = {
                                aeraName: item.aera,
                                fullName: item.customer.fullName,
                                address: item.customer.address,
                                village: item.customer.village,
                                district: item.customer.district,
                                province: item.customer.province,
                                phone: item.phone,
                                email: item.email,
                                deviceName: item.deviceName,
                                unitName: item.unitName,
                                paymentId: newPayment._id,
                                content: data.content,
                                power: power,
                                sum: sum,
                                payDetail: payDetail,
                                tax: tax,
                                total: total,
                                totalBywords: totalBywords,
                                exportBy: data.exportBy,
                                exportPhone: data.exportPhone,
                                exportDate: new Date().toLocaleDateString("en-US"),
                            };
                            MailService.sendMailPayment(mailRequest);
                        })
                        .catch((error) => {
                            console.error(error);
                            done(error);
                        });
                });
            });
        } catch (err) {
            console.error(err);
            done(err);
        }
    });
};