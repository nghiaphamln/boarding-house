const User = require('../models/user.model');
const TokenUtil = require('../utils/token.util');
const Cache = require('memory-cache');

module.exports = Auth = async (req, res, next) => {
    const source = req.headers['user-agent'];
    try {
        let token = req.header('Authorization').replace('Bearer ', '');
        let data = await TokenUtil.VerifyToken(token);

        let keyCache = `UserInfo:${data._id}`;
        let user = await Cache.get(keyCache);
        if (!user) {
            user = await User.findOne({
                _id: data._id,
                isActivated: true,
                isDeleted: false,
            });

            if (user) {
                // cache 5 phút
                Cache.put(keyCache, user, 5 * 60 * 1000);
            }
        }

        let {timeRevokeToken} = user;
        let {createdAt} = data;

        if (!user || !data.source || source !== data.source || !createdAt || new Date(createdAt) < new Date(timeRevokeToken)) {
            console.log('source !== data.source: ', source !== data.source);
            res.status(401).send({
                error: true,
                status: 401,
                message: 'Not authorized to access this resource',
            });
        }
        req._id = data._id;
        next();
    } catch (error) {
        res.status(401).send({
            error: true,
            status: 401,
            message: 'Not authorized to access this resource',
        });
    }
}
