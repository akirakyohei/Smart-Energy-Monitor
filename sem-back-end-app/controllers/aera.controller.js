const Aera = require("../entities/area");
const mongoose = require("mongoose");

// create
exports.createAera = function(req, res) {
    let aera = new Aera({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        status: true,
    });

    return aera
        .save()
        .then((newAera) => {
            return res.status(201).json({
                success: true,
                message: "Aera created successfully",
                aera: newAera,
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

exports.getAeraById = function(req, res) {
    Aera.findById(req.params.id)
        .then((singleAera) => {
            res.status(200).json({
                success: true,
                message: "Found",
                aera: singleAera,
            });
            return;
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: "This aera does not exist",
                error: err.message,
            });
            return;
        });
};

exports.getAllAera = async function(req, res) {
    var name = req.query.name;
    var perPage = Number(req.query.perPage);
    var page = Math.max(1, req.query.page);
    var q;
    if (name !== null) {
        q = Aera.find({ name: { $regex: ".*" + name + ".*" } });
    } else {
        q = Aera.find();
    }
    var count = 0;
    if (perPage !== null && page !== null) {
        if (name !== null) {
            var count = await Aera.count({ name: { $regex: ".*" + name + ".*" } });
        } else {
            var count = await Aera.count();
        }
        if (count === 0) {
            return res.status(200).json({
                success: true,
                message: "List of all aeras.",
                data: {
                    page: page,
                    perPage: perPage,
                    pages: 0,
                    aeras: [],
                },
            });
        }
        var totalPage = Math.ceil(count / perPage);
        page = Math.min(page, totalPage);
        q.skip(perPage * (page - 1)).limit(perPage);
    }
    q.sort({
        name: "asc",
    });
    q.select("_id name description status")
        .then((aeras) => {
            return res.status(200).json({
                success: true,
                message: "List of all aeras.",
                aeras: aeras,
                page: page,
                perPage: perPage,
                pages: 0,
            });
            return;
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: "Server error. Please try again.",
                error: err.message,
            });
            return;
        });
};

exports.updateAera = function(req, res) {
    const id = req.params.id;
    const updateAera = req.body;
    updateAera.updatedAt = Date.now();
    Aera.findByIdAndUpdate({ _id: id }, { $set: updateAera })
        .exec()
        .then(() => {
            res.status(200).json({
                success: true,
                message: "Area is updated.",
                updateAera: updateAera,
            });
            return;
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: "Server error. Please try again.",
            });
            return;
        });
};

exports.deleteAera = function(req, res) {
    Aera.findByIdAndRemove(req.params.id)
        .exec()
        .then(() => {
            res.status(204).json({
                success: true,
                message: "Aera is deleted.",
            });
            return;
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: "Server error. Please try again.",
            });
            return;
        });
};