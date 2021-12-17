"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apiConfig_1 = require("./config/apiConfig");
var express_1 = __importDefault(require("express"));
var authRouter_1 = require("./routes/auth/authRouter");
var friendRouter_1 = require("./routes/friendHidden/friendRouter");
var userRouter_1 = require("./routes/user/userRouter");
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = require("mongoose");
var app = (0, express_1.default)();
var port = 3000 || process.env.PORT;
var mongoose = new mongoose_1.Mongoose();
var cors = require("cors");
var corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};
dotenv_1.default.config();
app.use(cors(corsOptions));
app.use(express_1.default.json());
app.get('/', function (req, res) {
    res.send('The sedulous hyena ate the antelope!');
});
app.use('/auth', authRouter_1.authRouter);
app.use('/user', userRouter_1.userRouter);
app.use('/friend', friendRouter_1.friendRouter);
console.log(apiConfig_1.DB_PROD_URL);
mongoose.connect(apiConfig_1.DB_PROD_URL, function () {
    console.log("Database connected!");
    app.listen(port, function () {
        console.log('Servidor rodando 1');
    });
});
