"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIn = exports.signUp = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var index_js_1 = __importDefault(require("../models/index.js"));
var User = index_js_1.default.userModel;
var signUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, password, data, user, token, err_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                _a = req.body, username = _a.username, email = _a.email, password = _a.password;
                _b = {
                    username: username,
                    email: email
                };
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 1:
                data = (_b.password = _c.sent(),
                    _b);
                return [4 /*yield*/, User.create(data)];
            case 2:
                user = _c.sent();
                if (!user) {
                    return [2 /*return*/, res.status(409).send('Details are not correct')];
                }
                token = jsonwebtoken_1.default.sign({ id: 123 /*user.id*/ }, process.env.SECRET_KEY, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000,
                });
                res.cookie('jwt', token, {
                    maxAge: 1 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });
                console.log('user', JSON.stringify(user, null, 2));
                return [2 /*return*/, res.status(200).json({ user: user, token: token })];
            case 3:
                err_1 = _c.sent();
                return [2 /*return*/, res.status(400).json({ from: 'signup', err: err_1 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.signUp = signUp;
var logIn = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, passwordCorrect, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, User.findOne({
                        where: {
                            email: email,
                        },
                    })];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(401).json({ msg: 'email doesnt exist' })];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(password, password /*user.password*/)];
            case 2:
                passwordCorrect = _b.sent();
                if (!passwordCorrect) {
                    return [2 /*return*/, res.status(401).json({ msg: 'password is incorrect' })];
                }
                token = jsonwebtoken_1.default.sign({ id: 123 /*user.id*/ }, process.env.secretKey, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000,
                });
                res.cookie('jwt', token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
                console.log('user', JSON.stringify(user, null, 2));
                return [2 /*return*/, res.status(201).json({ user: user, token: token })];
            case 3:
                error_1 = _b.sent();
                return [2 /*return*/, res.status(400).json({ from: 'login', err: error_1 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.logIn = logIn;
