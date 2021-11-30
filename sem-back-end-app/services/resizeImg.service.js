const sharp = require("sharp");
const Image = require("../entities/image");
const crypto = require("crypto");
class Resize {
    constructor() {}
    async save(img, mimetype, filename) {
        const image = new Image();
        var buffFinal = await sharp(img).resize(300, 300, {
                fit: sharp.fit.inside,
                withoutEnlargement: true
            }).toBuffer()
            .then((buff) => { return buff; })
            .catch((err) => { console.error(err) });

        var encode_img = buffFinal.toString("base64");
        var buffImg = Buffer.from(encode_img, "base64");
        var final_img = {
            contentType: mimetype,
            data: buffImg,
        };
        console.log(final_img);
        image.name = crypto
            .createHash("md5")
            .update(filename + "-" + Date.now())
            .digest("base64");
        image.pic = final_img;

        try {

            var newImg = await image.save();
            console.log("save img success");
            return newImg.name;
        } catch (err) {
            console.log("save img fail");
            return null;
        }
    }
}

module.exports = Resize;