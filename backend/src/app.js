"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
var userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
var index_js_1 = __importDefault(require("./models/index.js"));
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
dotenv_1.default.config();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
process.on('uncaughtException', function (err) {
    console.log(err);
});
index_js_1.default.sequelize.sync({ force: true }).then(function () {
    console.log('db has been re sync');
});
app.get('/', function (req, res) {
    res.json({ message: 'Hello World!' });
});
app.use('/api', userRoutes_js_1.default);
// app.get('/users', userRoutes.getUsers);
// app.get('/users/:id', userRoutes.singleUser);
// app.post('/users', userRoutes.createUser);
// app.get('/users/:id', userRoutes.singleUser);
app.listen(PORT, function () {
    console.log("app listening on port ".concat(PORT));
});
