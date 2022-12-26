const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const NotFoundError = require('../exception/notFoundError.exception');
const CustomError = require('../exception/customError.exception');

const userSchema = new Schema(
    {
        name: {
            type: String,
            require: true,
            trim: true
        },
        username: {
            type: String,
            require: true,
            trim: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            require: true
        },
        avatar: {
            type: String,
            default: ''
        },
        dateOfBirth: {
            type: Date,
            Default: new Date('2000-01-01')
        },
        isActivated: {
            type: Boolean,
            default: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.statics.FindUserByCredentials = async (username, password) => {
    let user = await User.findOne({
        username,
        isActivated: true,
        isDeleted: false
    });

    if (!user)
        throw new NotFoundError('User');

    if (!await bcrypt.compare(password, user.password))
        throw new CustomError('Password invalid.');
    return user;
}

const User = mongoose.model('User', userSchema);
module.exports = User;
