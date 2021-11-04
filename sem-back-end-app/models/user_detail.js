class UserDetail {
    constructor(id, username, email, role, permissions) {
        this._id = id,
            this.username = username,
            this.email = email,
            this.role = role,
            this.permission = permissions
    };
    constructor() {

    };

}


module.exports = {
    UserDetail
}