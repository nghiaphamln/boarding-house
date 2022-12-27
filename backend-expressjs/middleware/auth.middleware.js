const User = require('../models/user.model');
const TokenUtil = require('../utils/token.util');
const RedisCache = require('../app/redis.app');

module.exports = Auth = async (req, res, next) => {
    const source = req.headers['user-agent'];
    try {
        let token = req.header('Authorization').replace('Bearer ', '');
        let data = await TokenUtil.VerifyToken(token);
        let keyCache = `User:${data._id}`;
        let user;
        if(await RedisCache.Exists(keyCache)) {
            user = await RedisCache.Get(keyCache);
            console.log("Đã cache");
        }
        else {
            user = await User.findOne({
                _id: data._id,
                isActivated: true,
                isDeleted: false,
            });

            if (user) {
                await RedisCache.Set(keyCache, user, 300);
            }

            console.log("Chưa cache");
        }

        let {timeRevokeToken} = user;
        let {createdAt} = data;

        if (!user || !data.source || source !== data.source || !createdAt || new Date(createdAt) < new Date(timeRevokeToken)) {
            console.log('source !== data.source: ', source !== data.source);
            throw new Error();
        }
        req._id = data._id;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).send({
            error: true,
            status: 401,
            message: 'Not authorized to access this resource',
        });
    }
}
