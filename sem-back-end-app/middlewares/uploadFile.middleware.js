const multer = require('multer');


var upload = multer({
    limits: {
        fileSize: 4 * 1024 * 1024,
    }
});

module.exports = upload;