const User = require("../entities/user");
const AdminDetail = require("../entities/admin_detail");
const Device = require("../entities/device");
const { exportPayment } = require("../services/exportPayemnt.service");
const ObjectId = require("mongoose").Types.ObjectId;
exports.exportPayment = async(req, res) => {
    try {
        const tokenFromClient =
            req.body.token || req.query.token || req.headers["x-access-token"];
        var userInfo = jwtHelper.decodeToken(tokenFromClient);
        var user = await User.findById(userInfo._id);
        var userDetail = await AdminDetail.find({ userId: userInfo._id });
        var aeras = [];
        req.query.aeras.map((item) => {
            aeras.push(new ObjectId(item));
        });

        var data = {
            aeras: aeras,
            startDay: req.query.startDay,
            endDay: req.query.endDay,
            exportBy: userDetail.fullName,
            exportPhone: user.phone,
        };
        exportPayment(data);
        return res.status(200).json({
            success: true,
            message: "Server error, Please try again.",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again.",
            error: err.message,
        });
        return;
    }
};

exports.getPaymentBycustomer = async(req, res) => {
    var data = {
        deviceId: req.params.deviceId,
        FromDate: req.params.fromDate,
        ToDate: req.params.toDate
    }
    const tokenFromClient =
        req.body.token || req.query.token || req.headers["x-access-token"];
    var userInfo = jwtHelper.decodeToken(tokenFromClient);
    var device = await Device.findById(data.deviceId);
    if (device.userId !== userInfo._id) {
        return res.status(403).json({
            success: false,
            message: "Bạn không sở hữu "
        })
    }
}