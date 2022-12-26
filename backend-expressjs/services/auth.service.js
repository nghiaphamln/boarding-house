const UserValidate = require('../validate/user.validate');
const User = require('../models/user.model');
const TokenUtil = require('../utils/token.util');

class AuthService {
    Register = async (userInfo) => {
        const registerInfo = await UserValidate.CheckRegisterInfo(userInfo);
        const newUser = new User({
            ...registerInfo
        });

        await newUser.save();
    }

    Login = async (username, password, source) => {
        UserValidate.ValidateLogin(username, password);
        let {_id} = await User.FindUserByCredentials(username, password);
        return await this.GenAndUpdateToken(_id, source);
    }

    GenAndUpdateToken = async (_id, source) => {
        const token = await TokenUtil.GenerateToken(
            { _id, source },
            process.env.JWT_LIFE_ACCESS_TOKEN
        );
        const refreshToken = await TokenUtil.GenerateToken(
            { _id, source },
            process.env.JWT_LIFE_REFRESH_TOKEN
        );

        await User.updateOne({_id}, {$pull: {refreshTokens: {source}}});
        await User.updateOne({_id}, {$push: {refreshTokens: {token: refreshToken, source}}});

        return {token, refreshToken};
    }
}

module.exports = new AuthService();
