const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

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

module.exports = mongoose.model('User', userSchema);
