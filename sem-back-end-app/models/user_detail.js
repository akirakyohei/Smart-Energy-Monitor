/**
 * @swagger
 * components:
 *  schemas:
 *      UserDetail:
 *          type: object
 *          properties:
 *              username:
 *                  type: string
 *              email:
 *                  type: string
 *              role:
 *                  type: string
 *              permission:
 *                  type: string[]
 *      
 */
let UserDetail = class {
    constructor(id = "", username = "", email = "", role = "", image = "", permissions = []) {
        this._id = id,
            this.username = username,
            this.email = email,
            this.image = image,
            this.role = role,
            this.permission = permissions
    }
};


module.exports = UserDetail;