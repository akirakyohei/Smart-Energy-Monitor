const User = require('../entities/user');
const CustomerDetail = require('../entities/custom_detail');
const AdminDetail = require('../entities/admin_detail');
const UserDetail = require("../models/user_detail");
const Role = require('../entities/role');
const Permission = require('../models/permission');
const Constrants = require("../constrants");
const jwtHelper = require("../helpers/jwtProvider.helper");
const secretKey = require("../configs/auth.config").secret;
const bcrypt = require('bcryptjs');
const { SyncMapPermissionContext } = require('twilio/lib/rest/preview/sync/service/syncMap/syncMapPermission');
exports.signupCustomer = (req, res) => {
    const user = new User();

    user.username = req.body.username;
    user.password = bcrypt.hashSync(req.body.password, 8);
    user.email = req.body.email;
    user.isAdmin = false;
    user.status = true;
    user.save((err, user) => {

        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.findOne({ name: Constrants.ROLE_USER }, (err, role) => {

            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            user.role = role._id;
            user.save(err => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }


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
                customerDetail.image = seq.body.image;
                customerDetail.birthDay = req.body.details.birthDay;

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

    })
}



exports.signin = (req, res) => {

    let username = req.body.username;
    let password = req.body.password;
    const user = User.findByCredentials(username, password).catch((err) => {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again.",
            error: err.message,
        });
    });;
    if (!user) {
        res.status(404).send({
            success: false,
            message: "User not found."
        });
    }
    const userDetail = new UserDetail();
    userDetail._id = user._id;
    userDetail.username = user.username;
    userDetail.email = user.email;

    const { roleName, permissionNames } = Role.findById(user.roleId, 'name permission', function(err, role) {
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
        for (let i = 0; i < permissionIds.length; i++) {
            Permission.findById(permissionIds[i], 'name', (err, permission) => {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: "Server error. Please try again.",
                        error: err.message,
                    });
                }
                permissions.push(permission.name);
            })
        }
        let roleName = role.name;
        return { roleName, permissions };
    })

    userDetail.role = roleName;
    userDetail.permission = permissionNames;

    var token = jwtHelper.genrateToken(user, secretKey, 86400);
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
};