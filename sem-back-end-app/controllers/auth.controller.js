const User = require('../entities/user');
const CustomerDetail = require('../entities/customer_detail');
const AdminDetail = require('../entities/admin_detail');
const UserDetail = require("../models/user_detail");
const Role = require('../entities/role');
const Permission = require('../entities/permission');
const Constrants = require("../constrants/constrant");
const jwtHelper = require("../helpers/jwtProvider.helper");
const secretKey = require("../configs/auth.config").secret;
const bcrypt = require('bcryptjs');
exports.signupCustomer = (req, res) => {
    User.init()
    const user = new User();
    user.username = req.body.username;
    user.password = bcrypt.hashSync(req.body.password, 8);
    user.email = req.body.email;
    user.isAdmin = false;
    user.status = true;

    Role.findOne({ name: Constrants.ROLE_USER }, (err, role) => {

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

            customerDetail.save().then((newCustomer) => {
                return res.status(201).json({
                    success: true,
                    message: 'User created successfully',
                });
            }).catch((err) => {
                console.log(err);
                res.status(500).json({
                    success: false,
                    message: "Server error. Please try again.",
                    error: err.message,
                });
            });


        })

    })
}



exports.signin = (req, res) => {

    let username = req.body.username;
    let password = req.body.password;
    User.findByCredentials(username, password).then((user) => {

        console.log(user._id);

        if (user._id == null) {
            res.status(404).send({
                success: false,
                message: "User not found."
            });
            return;
        }
        const userDetail = new UserDetail();
        userDetail._id = user._id;
        userDetail.username = user.username;
        userDetail.email = user.email;

        Role.findById(user.roleId, 'name permission', function(err, role) {
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
                    Permission.findById(id, 'name', (err, permission) => {
                        if (err) {
                            return reject(err);
                        }
                        permissions.push(permission.name);
                        resolve();
                    });
                });
            });

            Promise.all(permissions).then(() => {

            })



            userDetail.role = role.name;
            userDetail.permission = permissions;
            // return login
            console.log(userDetail);
            var token = jwtHelper.genrateToken(user, secretKey, 86400).then((token) => {

                res.status(200).send({
                    success: true,
                    message: "Login success!",
                    data: {
                        id: userDetail._id,
                        username: userDetail.username,
                        email: userDetail.email,
                        role: userDetail.role,
                        permission: userDetail.permission,
                        accessToken: token
                    }
                });
                return;
            }).catch((err) => {
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
        })


    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again.",
            error: err.message,
        });
        return;
    })
};