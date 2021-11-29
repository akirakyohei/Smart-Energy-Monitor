const User = require("../entities/user");
const CustomerDetail = require("../entities/customer_detail");
const AdminDetail = require("../entities/admin_detail");
const jwtHelper = require("../helpers/jwtProvider.helper");

exports.getUserDetail = async(req, res) => {
    const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
    var userInfo = jwtHelper.decodeToken(tokenFromClient);
    var isAdmin = await User.findById(userInfo._id).select('isAdmin');
    if (isAdmin) {
        var detail = await AdminDetail.find({ adminId: userInfo._id }).then((d) => {
            return d;
        }).catch((err) => {
            return res.status(500)
                .json({
                    success: false,
                    message: "get user details fail",
                    error: err
                })
        });
        detail.email = userInfo.email;
        detail.username = userInfo.username;

        return res.status(200).json({
            success: true,
            message: "detail success",
            data: detail
        });
    } else {
        var detail = await CustomerDetail.find({ adminId: userInfo._id }).then((d) => {
            return d;
        }).catch((err) => {
            return res.status(500)
                .json({
                    success: false,
                    message: "get user details fail",
                    error: err
                })
        });
        detail.email = userInfo.email;
        detail.username = userInfo.username;

        return res.status(200).json({
            success: true,
            message: "detail success",
            data: detail
        });
    }

}

exports.getCustomersPaginate = async(req, res) => {
    var perPage = Number(req.query.perPage);
    var page = Math.max(1, req.query.page);
    var count = await User.count({ isAdmin: false });

    var totalPage = Math.ceil(count / perPage);
    page = Math.min(page, totalPage);
    console.log(perPage);
    User.find({ isAdmin: false })
        .select('_id username email')
        .skip(perPage * (page - 1))
        .limit(perPage)
        .sort({
            username: 'asc'
        })
        .exec((err, listUser) => {
            if (err) {
                console.log("get customer detail fail");
                return res.status(500).json({
                    success: false,
                    message: "get customer failed",
                    error: error.message
                });
            }
            console.log("get customer detail success");
            console.log(listUser);
            return res.status(200).json({
                success: true,
                message: "get customer true",
                data: {
                    page: page,
                    perPage: perPage,
                    pages: totalPage,
                    customers: listUser
                }
            });
        });
}