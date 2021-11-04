const jwtHelper = require('../helpers/jwtProvider.helper');
const secretKey = require("../configs/auth.config").secret;
const debug = console.log.bind(console);
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || secretKey;


const verifyToken = async(req, res, next) => {
    const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];

    if (tokenFromClient) {
        try {
            const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
            req.user = decoded;
            next();
        } catch (e) {
            debug("Error verifying token:", e);
            return res.status(401).json({
                message: "Unauthorized.",
            });
        }
    } else {
        return res.status(403).send({
            message: "No token provided.",
        })
    }
}

const hasRoles = function(roles) {
    return async(req, res, next) => {

        let userRole = req.user.role;

        for (let i = 0; i < roles.length; i++) {
            if (roles[i] === userRole) {
                next();
                return;
            }
        }

        res.status(403).send({ message: 'Require role!' });
        return;
    }
}

const hasOneRole = function(role) {
    return async(req, res, next) => {

        let userRole = req.user.role;


        if (role === userRole) {
            next();
            return;
        }

        res.status(403).send({ message: 'Require role!' });
        return;
    }
}

const hasOnePermission = function(permission) {
    return async(req, res, next) => {

        let userPermission = req.user.permission;

        for (let i = 0; i < userPermission.length; i++) {
            if (userPermission[i] === permission) {
                next();
                return;
            }
        }

        res.status(403).send({ message: 'Require role!' });
        return;
    }
}

const hasPermissions = function(permissions) {
    return async(req, res, next) => {

        let userPermission = req.user.permission;

        let isPermission = permissions.some(item => userPermission.includes(item));
        if (isPermission) {
            next();
            return;
        }
        res.status(403).send({ message: 'Require role!' });
        return;
    }
}

const authJwt = {
    verifyToken,
    hasOneRole,
    hasOnePermission,
    hasRoles,
    hasPermissions
}

module.exports = authJwt;