const Permission = require('../entities/permission')
const mongoose = require('mongoose');

// create
exports.createPermission = function(req, res) {


    let permission = new Permission({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description
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
        return;
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
            return;
        }).catch((err) => {
            res.status(500).json({
                success: false,
                message: "This permission does not exist",
                error: err.message,
            });
            return;
        });
}

exports.getAllPermission = function(req, res) {
    var name = req.query.name;

    var q;
    if (name !== null) {
        q = Permission.find({ name: { $regex: ".*" + name + ".*" } });
    } else {
        q = Permission.find();
    }
    q.find()
        .select('_id name description')
        .then((permissions) => {
            return res.status(200).json({
                success: true,
                message: "List of all permission.",
                permissions: permissions,
            })
            return;
        }).catch((err) => {
            res.status(500).json({
                success: false,
                message: "Server error. Please try again.",
                error: err.message,
            });
            return;
        });
}


exports.updatePermission = function(req, res) {
    const id = req.params.id;
    const updatePermission = req.body;
    updatePermission.updatedAt = Date.now();
    Permission.findByIdAndUpdate({ _id: id }, { $set: r })
        .exec()
        .then(() => {
            res.status(200).json({
                success: true,
                message: "Permission is updated.",
                updatePermission: updatePermission,
            })
            return;
        }).catch((err) => {
            res.status(500).json({
                success: false,
                message: "Server error. Please try again."
            });
            return;
        });
}

exports.deletePermission = function(req, res) {
    Permission.findByIdAndRemove(req.params.id)
        .exec().then(() => {
            res.status(204).json({
                success: true,
            })
            return;
        }).catch((err) => {
            res.status(500).json({
                success: false,
            })
            return;
        })
}