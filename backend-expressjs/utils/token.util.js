const jwt = require('jsonwebtoken')
const CustomError = require('../exception/customError.exception');

class TokenUtil {
    GenerateToken = async (data, tokenLife) => {
        if (!data) return null;
        return await jwt.sign(
            {...data, createdAt: new Date()},
            process.env.JWT_KEY,
            {expiresIn: tokenLife}
        );
    }

    VerifyToken = async (token) => {
        if (!token) return new CustomError('Token invalid');
        return jwt.verify(token, process.env.JWT_KEY);
    }
}

module.exports = new TokenUtil();
