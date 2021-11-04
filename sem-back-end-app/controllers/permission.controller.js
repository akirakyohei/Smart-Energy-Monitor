const Permission = require('../entities/permission')
const mongoose = require('mongoose');

// create
exports.createPermission = function(req, res) {


    let permission = new Permission({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        code: req.body.code,
        description: req.body.description,
        status: true
    });

    return permission.save().then((newPermission) => {
        return res.status(201).json({
            success: true,
            message: 'Permission created successfully',
            Permission: newPermission,
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again.",
            error: err.message,
        });
    });

}


exports.getPermissionById = function(req, res) {
    Permission.findById(req.params.id)
        .then((singlePermission) => {
            res.status(200).json({
                success: true,
                message: "Found",
                permission: singlePermission,
            })
        }).catch((err) => {
            res.status(500).json({
                success: false,
                message: "This permission does not exist",
                error: err.message,
            });
        });
}

exports.getAllPermission = function(req, res) {
    Permission.find()
        .select('_id name description')
        .then((permissions) => {
            return res.status(200).json({
                success: true,
                message: "List of all permission.",
                permissions: permissions,
            })
        }).catch((err) => {
            res.status(500).json({
                success: false,
                message: "Server error. Please try again.",
                error: err.message,
            });
        });
}

exports.updatePermission = function(req, res) {
    const id = req.params.id;
    const updatePermission = req.body;
    updatePermission.updatedAt = Date.now();
    Permission.update({ _id: id }, { $set: r })
        .exec()
        .then(() => {
            res.status(200).json({
                success: true,
                message: "Permission is updated.",
                updatePermission: updatePermission,
            })
        }).catch((err) => {
            res.status(500).json({
                success: false,
                message: "Server error. Please try again."
            });
        });
}

exports.deletePermission = function(req, res) {
    Permission.findByIdAndRemove(req.params.id)
        .exec().then(() => {
            res.status(204).json({
                success: true,
            })
        }).catch((err) => {
            res.status(500).json({
                success: false,
            })
        })
}