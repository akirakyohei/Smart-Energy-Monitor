const Unit = require('../entities/unit');
const mongoose = require('mongoose');

// create
exports.createUnit = function(req, res) {

    let unit = new Unit({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        unit: req.body.unit,
    });

    return unit.save().then((newUnit) => {
        return res.status(201).json({
            success: true,
            message: 'Unit created successfully',
            unit: newUnit,
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


exports.getUnitById = function(req, res) {
    Unit.findById(req.params.id)
        .then((singleUnit) => {
            res.status(200).json({
                success: true,
                message: "Found",
                unit: singleUnit,
            })
            return;
        }).catch((err) => {
            res.status(500).json({
                success: false,
                message: "This aera does not exist",
                error: err.message,
            });
            return;
        });
}

exports.getAllUnit = function(req, res) {

    var name = req.query.name;

    var q;
    if (name !== null) {
        q = Unit.find({ name: { $regex: ".*" + name + ".*" } });
    } else {
        q = Unit.find();
    }

    q.select('_id name description unit')
        .then((units) => {
            return res.status(200).json({
                success: true,
                message: "List of all units.",
                units: units,
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

exports.updateUnit = function(req, res) {
    const id = req.params.id;
    const updateUnit = req.body;
    updateUnit.updatedAt = Date.now();
    Unit.findByIdAndUpdate({ _id: id }, { $set: updateUnit })
        .exec()
        .then(() => {
            res.status(200).json({
                success: true,
                message: "Unit is updated.",
                updateUnit: updateUnit,
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

exports.deleteUnit = function(req, res) {
    Unit.findByIdAndRemove(req.params.id)
        .exec().then(() => {
            res.status(204).json({
                success: true,
                message: "Unit is deleted.",
            })
            return;
        }).catch((err) => {
            res.status(500).json({
                success: false,
                message: "Server error. Please try again.",
                error: err
            });
            return;
        })
}