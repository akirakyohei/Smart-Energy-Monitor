const User = require("../entities/user");
const CustomerDetail = require("../entities/customer_detail");
const AdminDetail = require("../entities/admin_detail");
const jwtHelper = require("../helpers/jwtProvider.helper");
const ObjectId = require("mongoose").Types.ObjectId;
exports.getUserDetail = async(req, res) => {
    const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
    var userInfo = jwtHelper.decodeToken(tokenFromClient);
    var isAdmin = await User.findById(userInfo._id).select('isAdmin');
    if (isAdmin) {
        var detail = await AdminDetail.find({ adminId: userInfo._id }).then((d) => {
            return d;
        }).catch((err) => {
            return res.status(500)
                .json({
                    success: false,
                    message: "get user details fail",
                    error: err
                })
        });
        detail.email = userInfo.email;
        detail.username = userInfo.username;

        return res.status(200).json({
            success: true,
            message: "detail success",
            data: detail
        });
    } else {
        var detail = await CustomerDetail.find({ adminId: userInfo._id }).then((d) => {
            return d;
        }).catch((err) => {
            return res.status(500)
                .json({
                    success: false,
                    message: "get user details fail",
                    error: err
                })
        });
        detail.email = userInfo.email;
        detail.username = userInfo.username;

        return res.status(200).json({
            success: true,
            message: "detail success",
            data: detail
        });
    }

}

exports.getCustomersPaginate = async(req, res) => {
    var perPage = Number(req.query.perPage);
    var page = Math.max(1, req.query.page);
    var count = await User.count({ isAdmin: false });
    if (count === 0) {
        return res.status(200).json({
            success: true,
            message: "get employee success",
            data: {
                page: page,
                perPage: perPage,
                pages: 0,
                employees: []
            }
        });
    }
    var totalPage = Math.ceil(count / perPage);
    page = Math.min(page, totalPage);
    console.log(perPage);
    User.find({ isAdmin: false })
        .select('_id username email')
        .skip(perPage * (page - 1))
        .limit(perPage)
        .sort({
            username: 'asc'
        })
        .exec((err, listUser) => {
            if (err) {
                console.log("get customer detail fail");
                return res.status(500).json({
                    success: false,
                    message: "get customer failed",
                    error: err.message
                });
            }
            console.log("get customer detail success");
            console.log(listUser);
            return res.status(200).json({
                success: true,
                message: "get customer true",
                data: {
                    page: page,
                    perPage: perPage,
                    pages: totalPage,
                    customers: listUser
                }
            });
        });
}

exports.getEmployeePaginate = async(req, res) => {
    var perPage = Number(req.query.perPage);
    var page = Math.max(1, req.query.page);
    var count = await User.count({ isAdmin: true });
    if (count === 0) {
        return res.status(200).json({
            success: true,
            message: "get employee success",
            data: {
                page: page,
                perPage: perPage,
                pages: 0,
                employees: []
            }
        });
    }
    var totalPage = Math.ceil(count / perPage);
    page = Math.min(page, totalPage);
    console.log(perPage);
    User.find({ isAdmin: true })
        .select('_id username email')
        .sort({
            username: 'asc'
        })
        .skip(perPage * (page - 1))
        .limit(perPage)
        .exec((err, listUser) => {
            if (err) {
                console.log("get employee fail");
                return res.status(500).json({
                    success: false,
                    message: "get employee failed",
                    error: err.message
                });
            }
            console.log("get employee success");
            console.log(listUser);
            return res.status(200).json({
                success: true,
                message: "get employee success",
                data: {
                    page: page,
                    perPage: perPage,
                    pages: totalPage,
                    employees: listUser
                }
            });
        });
}

exports.getCustomerDetailById = async(req, res) => {
    var id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: 'get customer detail failed',
            errorr: "id not valid ObjectId."
        })
    }
    var user = await User.findById(id).select("username email");

    var customerDetail = await CustomerDetail.findOne({ userId: id });

    console.log(customerDetail);
    if (user == null && customerDetail == null) {
        return res.status(500).json({
            success: false,
            message: "get employee failed",
            error: "Couldn't find customer detail"
        });
    }
    return res.status(200).json({
        success: true,
        message: "customer details success",
        data: {
            username: user.username,
            email: user.email,
            firstName: customerDetail.firstName,
            lastName: customerDetail.lastName,
            fullName: customerDetail.fullName,
            province: customerDetail.province,
            district: customerDetail.district,
            village: customerDetail.village,
            phone: customerDetail.phone,
            address: customerDetail.address,
            birthday: customerDetail.birthday,
        }
    })

}

exports.getEmployeeDetailById = async(req, res) => {
    var id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: 'get customer detail failed',
            errorr: "id not valid ObjectId."
        })
    }
    var user = await User.findById(id).select("username email");

    var adminDetail = await AdminDetail.findOne({ userId: id });

    if (user == null && adminDetail == null) {
        return res.status(500).json({
            success: false,
            message: "get employee failed",
            error: "Couldn't find customer detail"
        });
    }
    return res.status(200).json({
        success: true,
        message: "customer details success",
        data: {
            username: user.username,
            email: user.email,
            firstName: adminDetail.firstName,
            lastName: adminDetail.lastName,
            fullName: adminDetail.fullName,
            phone: adminDetail.phone,
            address: adminDetail.address,
            birthday: adminDetail.birthday,
        }
    })

}