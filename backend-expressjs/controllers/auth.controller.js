const AuthService = require('../services/auth.service');

class AuthController {
    // [POST] /auth/register
    Register = async (req, res, next) => {
        try {
            await AuthService.Register(req.body);
            res.status(201).json();
        }
        catch (err) {
            next(err);
        }
    }
}

module.exports = new AuthController();
