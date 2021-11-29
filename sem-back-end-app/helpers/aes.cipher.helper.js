const crypto = require('crypto');
const cipherConfig = require('../configs/cipher.config');
var iv = cipherConfig.iv;
var algorithm = 'aes-256-cbc';

exports.encrypt = (text) => {
    var cipher = crypto.createCipheriv(algorithm, new Buffer.from(cipherConfig.secretKey), iv);

    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
};

exports.decrypt = (text) => {
    var decipher = crypto.createDecipheriv(algorithm, new Buffer.from(cipherConfig.secretKey), iv);
    var dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}