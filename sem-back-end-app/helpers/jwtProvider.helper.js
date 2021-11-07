const jwt = require('jsonwebtoken');
const UserDetail = require('../models/user_detail');

let genrateToken = (user, secretSignature, tokenLife) => {
    return new Promise((resolve, reject) => {
        const data = new UserDetail();
        data._id = user._id;
        data.username = user.username;
        data.email = user.email;
        data.role = user.role;
        data.permission = user.permission;

        jwt.sign({ data: data },
            secretSignature, {
                algorithm: "HS512",
                expiresIn: tokenLife
            },
            (error, token) => {
                if (error) {
                    return reject(error);
                }
                resolve(token);
            }
        )
    })
}

let verifyToken = (token, secretKey) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (error, decoded) => {
            if (error) {
                return reject(error);
            }
            resolve(decoded);
        })
    })
}

module.exports = {
    genrateToken: genrateToken,
    verifyToken: verifyToken,
}