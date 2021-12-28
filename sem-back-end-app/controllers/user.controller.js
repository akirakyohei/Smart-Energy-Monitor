const User = require("../entities/user");
const CustomerDetail = require("../entities/customer_detail");
const AdminDetail = require("../entities/admin_detail");
const jwtHelper = require("../helpers/jwtProvider.helper");
const ObjectId = require("mongoose").Types.ObjectId;
const Resize = require("../services/resizeImg.service");
const Image = require('../entities/image');
exports.getUserDetail = async(req, res) => {
    const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
    var userInfo = jwtHelper.decodeToken(tokenFromClient);
    var user = await User.findById(userInfo._id);
    if (user.isAdmin) {
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
        detail.image = user.image;
        detail.phone = user.phone;

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
        detail.image = user.image;
        detail.phone = user.phone;

        return res.status(200).json({
            success: true,
            message: "detail success",
            data: detail
        });
    }

}

exports.updateAccount = async(req, res) => {
    const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
    var userInfo = jwtHelper.decodeToken(tokenFromClient);
    var user = await User.findById(userInfo._id);
    if (req.file != undefined) {

        Image.findOneAndDelete({ name: user.image });
        console.log(req.file);
        var img = req.file.buffer;
        console.log(img);
        const fileUpload = new Resize();
        const filename = await fileUpload.save(
            img,
            req.file.mimetype,
            req.file.originalname
        );

        if (filename != null) {
            user.image = filename;
        }
        user.updated_at = Date.now;
        var userRs = await user.save().then((d) => {
            return d;
        }).catch((err) => {
            return res.status(500)
                .json({
                    success: false,
                    message: "update account fail",
                    error: err
                })
        });
    }



    if (user.isAdmin) {
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
        if (req.body.firstName) {
            detail.firstName = req.body.firstName;
        }
        if (req.body.lastName) {
            detail.firstName = req.body.firstName;
        }
        if (req.body.fullName) {
            detail.fullName = req.body.fullName;
        }
        detail.updatedAt = Date.now;
        detail.save().then((result) => {
            return res.status(200).json({
                success: true,
                message: "update account success"
            });
        }).catch((err) => {
            return res.status(500)
                .json({
                    success: false,
                    message: "update account fail",
                    error: err
                })
        });

    } else {
        var detail = await CustomerDetail.find({ adminId: userInfo._id }).then((d) => {
            return d;
        }).catch((err) => {
            return res.status(500)
                .json({
                    success: false,
                    message: "update account fail",
                    error: err
                })
        });
        if (req.body.firstName) {
            detail.firstName = req.body.firstName;
        }
        if (req.body.lastName) {
            detail.firstName = req.body.firstName;
        }
        if (req.body.fullName) {
            detail.fullName = req.body.fullName;
        }

        if (req.body.address) {
            detail.address = req.body.address;
        }

        if (req.body.province) {
            detail.province = req.body.province;
        }

        if (req.body.district) {
            detail.district = req.body.district;
        }

        if (req.body.village) {
            detail.village = req.body.village;
        }
        detail.updatedAt = Date.now;
        detail.save().then((result) => {
            return res.status(200).json({
                success: true,
                message: "update account success"
            });
        }).catch((err) => {
            return res.status(500)
                .json({
                    success: false,
                    message: "update account fail",
                    error: err
                })
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

exports.getAdminPaginate = async(req, res) => {
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
            phone: user.phone,
            address: customerDetail.address,
            image: user.image
        }
    })

}

exports.getAdminDetailById = async(req, res) => {
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
            phone: user.phone,
            image: user.image
        }
    });

}

exports.updateCustomer = async(req, res) => {
    var user = await User.findById(req.params.id);
    if (req.file != undefined) {

        Image.findOneAndDelete({ name: user.image });
        console.log(req.file);
        var img = req.file.buffer;
        console.log(img);
        const fileUpload = new Resize();
        const filename = await fileUpload.save(
            img,
            req.file.mimetype,
            req.file.originalname
        );

        if (filename != null) {
            user.image = filename;
        }
        user.updated_at = Date.now;

        user.save().then(d => { return d; }).catch((err) => {
            return res.status(500)
                .json({
                    success: false,
                    message: "update customer fail",
                    error: err
                });
        });
    }
    if (req.body.status) {
        user.status = req.body.status;
        user.updated_at = Date.now;

        user.save().then(d => { return d; }).catch((err) => {
            return res.status(500)
                .json({
                    success: false,
                    message: "update customer fail",
                    error: err
                });
        });
    }

    var detail = await CustomerDetail.find({ adminId: userInfo._id }).then((d) => {
        return d;
    }).catch((err) => {
        return res.status(500)
            .json({
                success: false,
                message: "update customer fail",
                error: err
            });
    });
    if (req.body.firstName) {
        detail.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
        detail.firstName = req.body.firstName;
    }
    if (req.body.fullName) {
        detail.fullName = req.body.fullName;
    }

    if (req.body.address) {
        detail.address = req.body.address;
    }

    if (req.body.province) {
        detail.province = req.body.province;
    }

    if (req.body.district) {
        detail.district = req.body.district;
    }

    if (req.body.village) {
        detail.village = req.body.village;
    }
    detail.updatedAt = Date.now;
    detail.save().then((result) => {
        return res.status(200).json({
            success: true,
            message: "update customer success"
        });
    }).catch((err) => {
        return res.status(500)
            .json({
                success: false,
                message: "update customer fail",
                error: err
            })
    });

}
exports.updateAdmin = async(req, res) => {
    var user = await User.findById(req.params.id);
    if (req.file != undefined) {

        Image.findOneAndDelete({ name: user.image });
        console.log(req.file);
        var img = req.file.buffer;
        console.log(img);
        const fileUpload = new Resize();
        const filename = await fileUpload.save(
            img,
            req.file.mimetype,
            req.file.originalname
        );

        if (filename != null) {
            user.image = filename;
        }
        user.updated_at = Date.now;

        user.save().then(d => { return d; }).catch((err) => {
            return res.status(500)
                .json({
                    success: false,
                    message: "update customer fail",
                    error: err
                });
        });
    }

    if (req.body.status) {
        user.status = req.body.status;
        user.updated_at = Date.now;

        user.save().then(d => { return d; }).catch((err) => {
            return res.status(500)
                .json({
                    success: false,
                    message: "update customer fail",
                    error: err
                });
        });
    }

    var detail = await AdminDetail.find({ adminId: userInfo._id }).then((d) => {
        return d;
    }).catch((err) => {
        return res.status(500)
            .json({
                success: false,
                message: "update customer fail",
                error: err
            });
    });
    if (req.body.firstName) {
        detail.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
        detail.firstName = req.body.firstName;
    }
    if (req.body.fullName) {
        detail.fullName = req.body.fullName;
    }

    if (req.body.aera) {
        detail.aera = req.body.aera;
    }

    detail.updatedAt = Date.now;
    detail.save().then((result) => {
        return res.status(200).json({
            success: true,
            message: "update customer success"
        });
    }).catch((err) => {
        return res.status(500)
            .json({
                success: false,
                message: "update customer fail",
                error: err
            })
    });

}