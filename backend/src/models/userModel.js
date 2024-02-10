"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (sequelise, dataTypes) {
    var User = sequelise.define('user', {
        username: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false,
        },
    }, { timestamps: true });
    return User;
});
