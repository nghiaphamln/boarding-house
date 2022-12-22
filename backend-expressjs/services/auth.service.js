const UserValidate = require('../validate/user.validate');
const User = require('../models/user.model');

class AuthService {
    Register = async (userInfo) => {
        const registerInfo = await UserValidate.CheckRegisterInfo(userInfo);
        const newUser = new User({
            ...registerInfo
        });

        await newUser.save();
    }
}

module.exports = new AuthService();
