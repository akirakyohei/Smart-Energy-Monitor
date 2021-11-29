const User = require("../entities/user");



const checkDuplicateUsernameOrEmail = (req, res, next) => {

    var username = req.body.username;

    User.findOne({ username: username })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (user) {
                res.status(400).send({ message: "failed!Username is already in use!" });
                return;
            }

            var email = req.body.email;
            User.findOne({ email: email }).exec((err, user) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                if (user) {
                    res.status(400).send({ message: "Failed! Email is already in use!" })
                    return;
                }

                next();
            });
        });

}

exports.checkDuplicateUsernameOrEmail = checkDuplicateUsernameOrEmail;