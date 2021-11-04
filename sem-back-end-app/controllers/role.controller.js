const Role = require('../entities/role');
const mongoose = require('mongoose');

// create
exports.createRole = function(req, res) {

    let role = new Role({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        status: true
    });
    return role.save().then((newRole) => {
        return res.status(201).json({
            success: true,
            message: 'Role created successfully',
            Role: newRole,
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


exports.getRoleById = function(req, res) {
    Role.findById(req.params.id)
        .then((singleRole) => {
            res.status(200).json({
                success: true,
                message: "Found",
                Role: singleRole,
            })
        }).catch((err) => {
            res.status(500).json({
                success: false,
                message: "This role does not exist",
                error: err.message,
            });
        });
}

exports.getAllRole = function(req, res) {
    Role.find()
        .select('_id name description')
        .then((roles) => {
            return res.status(200).json({
                success: true,
                message: "List of all role.",
                roles: roles,
            })
        }).catch((err) => {
            res.status(500).json({
                success: false,
                message: "Server error. Please try again.",
                error: err.message,
            });
        });
}

exports.updateRole = function(req, res) {
    const id = req.params.id;
    const updateRole = req.body;
    updateRole.updatedAt = Date.now();
    Role.update({ _id: id }, { $set: r })
        .exec()
        .then(() => {
            res.status(200).json({
                success: true,
                message: "Role is updated.",
                updateRole: updateRole,
            })
        }).catch((err) => {
            res.status(500).json({
                success: false,
                message: "Server error. Please try again."
            });
        });
}

exports.deleteRole = function(req, res) {
    Role.findByIdAndRemove(req.params.id)
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