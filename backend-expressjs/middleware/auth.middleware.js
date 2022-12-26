const User = require('../models/user.model');
const TokenUtil = require('../utils/token.util');
const AuthenError = require('../exception/authenError.exception');

module.exports = Auth = async (req, res, next) => {
    const source = req.headers['user-agent'];
    try {
        let token = req.header('Authorization').replace('Bearer ', '');
        let data = await TokenUtil.VerifyToken(token);

        let user = await User.findOne({
            _id: data._id,
            isActivated: true,
            isDeleted: false,
        });

        let {timeRevokeToken} = user;
        let {createdAt} = data;

        if (!user || !data.source || source !== data.source || !createdAt || new Date(createdAt) < new Date(timeRevokeToken)) {
            console.log('source !== data.source: ', source !== data.source);
            throw new Error();
        }
        req._id = data._id;
        next();
    } catch (error) {
        throw new AuthenError('Not authorized to access this resource.');
    }
}
