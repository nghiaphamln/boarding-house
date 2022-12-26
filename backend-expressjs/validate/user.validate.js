const CommonUtil = require('../utils/common.util');
const CustomError = require('../exception/customError.exception');
const User = require('../models/user.model');

const NAME_INVALID = 'Tên không hợp lệ';
const USERNAME_INVALID = 'Tài khoản không hợp lệ';
const USERNAME_EXISTS_INVALID = 'Tài khoản đã tồn tại';
const PASSWORD_INVALID = 'Mật khẩu không hợp lệ, từ 8 đến 50 kí tự';
const DATE_INVALID = 'Ngày sinh không hợp lệ';
const GENDER_INVALID = 'Giới tính không hợp lệ';
const NAME_REGEX = /\w{1,50}/;

class UserValidate {
    ValidateEmail = (email) => {
        if (!email) return false;
        const regex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email.toString().toLowerCase());
    }

    ValidatePhone = (phone) => {
        if (!phone) return false;
        const regex = /(84|0[35789])+([0-9]{8})\b/g;
        return regex.test(phone);
    }

    ValidateUsername = (username) => {
        return !(!username ||
            (!this.ValidateEmail(username) && !this.ValidatePhone(username)));
    }

    ValidatePassword = (password) => {
        if (!password) return false;
        return !(password.length < 8 || password.length > 50);
    }

    CheckRegisterInfo = async (userInfo) => {
        const {name, username, password} = userInfo;
        let error = {};

        if (!name || !NAME_REGEX.test(name)) {
            error.name = NAME_INVALID;
        }
        if (!this.ValidateUsername(username)) {
            error.username = USERNAME_INVALID;
        }
        else if (await User.findOne({username})) {
            error.username = USERNAME_EXISTS_INVALID;
        }
        if (!this.ValidatePassword(password)) {
            error.password = PASSWORD_INVALID;
        }
        if (!CommonUtil.IsEmpty(error)) throw new CustomError(error);
        return {name, username, password};
    }
}

module.exports = new UserValidate();
