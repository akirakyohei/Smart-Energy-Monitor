const User = require("../entities/user");
const CustomerDetail = require("../entities/customer_detail");
const AdminDetail = require("../entities/admin_detail");


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
            CustomerDetail.findOne({ email: email }).exec((err, customer_detail) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                if (customer_detail) {
                    res.status(400).send({ message: "Failed! Email is already in use!" })
                    return;
                }
                AdminDetail.findOne({ email: email })
                    .exec((err, result) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }

                        if (result) {
                            res.status(400).send({ message: "Failed! Email is already in use!" })
                            return;
                        }
                        next();
                    });

            });
        });

}

exports.checkDuplicateUsernameOrEmail = checkDuplicateUsernameOrEmail;