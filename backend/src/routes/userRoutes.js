"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userController_js_1 = require("../controllers/userController.js");
var userAuth_js_1 = __importDefault(require("../middleware/userAuth.js"));
var router = express_1.default.Router();
router.post('/signup', userAuth_js_1.default, userController_js_1.signUp);
router.post('/login', userController_js_1.logIn);
exports.default = router;
