"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var userModel_js_1 = __importDefault(require("./userModel.js"));
var _a = process.env, PG_USER = _a.PG_USER, PG_ENDPOINT = _a.PG_ENDPOINT, PG_DB = _a.PG_DB, PG_PASSWORD = _a.PG_PASSWORD, PG_PORT = _a.PG_PORT;
var sequelize = new sequelize_1.Sequelize("postgres://".concat(PG_USER, ":").concat(PG_PASSWORD, "@").concat(PG_ENDPOINT, ":").concat(PG_PORT, "/").concat(PG_DB), {
    dialect: 'postgres',
});
sequelize
    .authenticate()
    .then(function () {
    console.log('Database connected');
})
    .catch(function (err) {
    console.error(err);
});
var db = {
    Sequelize: sequelize_1.Sequelize,
    sequelize: sequelize,
    userModel: (0, userModel_js_1.default)(sequelize, sequelize_1.DataTypes),
};
exports.default = db;
