const UserValidate = require('../validate/user.validate');
const User = require('../models/user.model');
const TokenUtil = require('../utils/token.util');
const AuthenError = require('../exception/authenError.exception');

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

    RefreshToken = async (refreshToken, source) => {
        let {_id} = await TokenUtil.VerifyToken(refreshToken);

        const user = await User.findOne({
            _id,
            isActivated: true,
            refreshTokens: {
                $elemMatch: {token: refreshToken, source}
            },
        });

        if (!user) throw new AuthenError();

        return await TokenUtil.GenerateToken(
            {_id, source},
            process.env.JWT_LIFE_ACCESS_TOKEN
        );
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
