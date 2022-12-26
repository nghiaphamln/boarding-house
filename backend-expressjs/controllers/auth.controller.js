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

    // [POST] /auth/login
    Login = async (req, res, next) => {
        const { username, password } = req.body;
        const source = req.headers['user-agent'];

        try {
            const { token, refreshToken } = await AuthService.Login(
                username,
                password,
                source
            );
            res.json({token, refreshToken});
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new AuthController();
