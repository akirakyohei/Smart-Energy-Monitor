const User = require("../entities/user");
const CustomerDetail = require("../entities/customer_detail");
const AdminDetail = require("../entities/admin_detail");
const UserDetail = require("../models/user_detail");
const Role = require("../entities/role");
const Permission = require("../entities/permission");
const Resize = require("../services/resizeImg.service");
const Constrants = require("../constrants/constrant");
const jwtHelper = require("../helpers/jwtProvider.helper");
const secretKey = require("../configs/auth.config").secret;
const bcrypt = require("bcryptjs");
const Aes = require("../helpers/aes.cipher.helper");
const MailService = require("../services/mail.service");

exports.signupCustomer = async(req, res) => {
    User.init();
    const user = new User();
    user.username = req.body.username;
    user.password = bcrypt.hashSync(req.body.password, 8);
    user.email = req.body.email;
    user.isAdmin = false;
    user.status = false;

    if (req.file != undefined) {
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
            user.image = result;
        }
    }
    Role.findOne({ name: Constrants.role.ROLE_USER }, (err, role) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: "Server error. Please try again.",
                error: err.message,
            });
            return;
        }
        console.log(role);
        user.roleId = role._id;
        user.save((err, user) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: "Server error. Please try again.",
                    error: err.message,
                });
                return;
            }
            CustomerDetail.init();
            const customerDetail = new CustomerDetail();

            customerDetail.userId = user._id;
            customerDetail.firstName = req.body.details.firstName;
            customerDetail.lastName = req.body.details.lastName;
            customerDetail.fullName = req.body.details.fullName;
            customerDetail.phone = req.body.details.phone;
            customerDetail.address = req.body.details.address;
            customerDetail.province = req.body.details.province;
            customerDetail.district = req.body.details.district;
            customerDetail.village = req.body.details.village;
            customerDetail.image = req.body.image;
            customerDetail.birthday = req.body.details.birthday;

            customerDetail
                .save()
                .then((newCustomer) => {
                    var userInfo = {
                        id: user._id,
                        date: Date.now(),
                    };

                    var userInfoStr = JSON.stringify(userInfo);
                    var cipherUser = Aes.encrypt(userInfoStr);
                    const url = 'http://localhost:8080/api/auth/verify/' + encodeURI(cipherUser);

                    MailService.sendMailVerify(user.email, url);

                    return res.status(201).json({
                        success: true,
                        message: "User created successfully",
                    });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({
                        success: false,
                        message: "Server error. Please try again.",
                        error: err.message,
                    });
                });
        });
    });
};

exports.signupEmployee = async(req, res) => {
    User.init();
    const user = new User();
    user.username = req.body.username;
    user.password = bcrypt.hashSync(req.body.password, 8);
    user.email = req.body.email;
    user.isAdmin = true;
    user.status = true;

    if (req.file != undefined) {
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
            user.image = result;
        }
    }
    user.roleId = req.body.roleId;
    user.save((err, user) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: "Server error. Please try again.",
                error: err.message,
            });
            return;
        }
        AdminDetail.init();
        const adminDetail = new AdminDetail();

        adminDetail.userId = user._id;
        adminDetail.firstName = req.body.details.firstName;
        adminDetail.lastName = req.body.details.lastName;
        adminDetail.fullName = req.body.details.fullName;
        adminDetail.phone = req.body.details.phone;
        adminDetail.aera = req.body.details.aera;
        adminDetail.birthday = req.body.details.birthday;
        adminDetail
            .save()
            .then((newAdmin) => {
                return res.status(201).json({
                    success: true,
                    message: "User created successfully",
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    success: false,
                    message: "Server error. Please try again.",
                    error: err.message,
                });
            });
    });
};






exports.signin = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    User.findByCredentials(username, password)
        .then((user) => {
            console.log(user._id);

            if (user._id == null) {
                res.status(404).send({
                    success: false,
                    message: "User not found.",
                });
                return;
            }
            const userDetail = new UserDetail();
            userDetail._id = user._id;
            userDetail.username = user.username;
            userDetail.email = user.email;

            Role.findById(user.roleId, "name permission", function(err, role) {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: "Server error. Please try again.",
                        error: err.message,
                    });
                    return;
                }
                permissionIds = role.permission;
                permissions = [];

                var promises = permissionIds.map(function(id) {
                    return new Promise(function(resolve, reject) {
                        Permission.findById(id, "name", (err, permission) => {
                            if (err) {
                                return reject(err);
                            }
                            permissions.push(permission.name);
                            resolve();
                        });
                    });
                });

                Promise.all(permissions).then(() => {});

                userDetail.role = role.name;
                userDetail.permission = permissions;
                // return login
                console.log(userDetail);
                var token = jwtHelper
                    .genrateToken(user, secretKey, 86400)
                    .then((token) => {
                        res.status(200).send({
                            success: true,
                            message: "Login success!",
                            data: {
                                id: userDetail._id,
                                username: userDetail.username,
                                email: userDetail.email,
                                role: userDetail.role,
                                permission: userDetail.permission,
                                accessToken: token,
                            },
                        });
                        return;
                    })
                    .catch((err) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json({
                                success: false,
                                message: "Server error. Please try again.",
                                error: err.message,
                            });
                            return;
                        }
                    });
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Server error. Please try again.",
                error: err.message,
            });
            return;
        });
};





exports.verify = (req, res) => {

    var userCipher = decodeURI(req.params.data);
    var userStr = Aes.decrypt(userCipher);
    var userInfo = JSON.parse(userStr);

    var user = User.findByIdAndUpdate({ _id: userInfo.id }, { $set: { status: true } }).then((user) => {
        console.log("active User: ", userInfo.id);
        res.redirect("https://google.com/")
    }).catch(
        (err) => {
            console.log(err);
        }
    );

}