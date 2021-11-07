// /**
//  * @swagger
//  * components:
//  *  schemas:
//  *      UserDetail:
//  *          type: object
//  *          required:
//  *          properties:
//  *              _id:
//  *                  type: ObjectId
//  *              username:
//  *                  type: String
//  *              email:
//  *                  type: String
//  *              role:
//  *                  type: String
//  *              permission:
//  *                  type: String[]
//  *      
//  */
let UserDetail = class {
    constructor(id = "", username = "", email = "", role = "", permissions = []) {
        this._id = id,
            this.username = username,
            this.email = email,
            this.role = role,
            this.permission = permissions
    }
};


module.exports = UserDetail;