const Image = require('../entities/image');


exports.getImage = async(req, res) => {
    const nameImg = req.params.image;

    Image.findOne({ 'name': nameImg }).then((image) => {
        res.set('content-type', image.pic.contentType);
        res.send(image.pic.data);
    }).catch((err) => {
        res.status(404).json({
            success: false,
            message: "get image fail",
            err: err.message
        });
    });
}