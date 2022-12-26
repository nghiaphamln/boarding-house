class AuthenError extends Error {
    constructor(message = 'Not authorize.') {
        super();
        this.status = 401;
        this.message = message;
    }
}

module.exports = AuthenError;
