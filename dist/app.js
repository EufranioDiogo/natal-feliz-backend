"use strict";

var _express = _interopRequireDefault(require("express"));

var _authRouter = require("./routes/auth/authRouter");

var _friendRouter = require("./routes/friendHidden/friendRouter");

var _userRouter = require("./routes/user/userRouter");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mongoose = require("mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import { DB_PROD_URL, DB_DEV_URL } from './config/apiConfig';
var app = (0, _express["default"])();
var port = 3000 || process.env.PORT;
var mongoose = new _mongoose.Mongoose();

var cors = require("cors");

var corsOptions = {
  origin: '*',
  credentials: true,
  //access-control-allow-credentials:true
  optionSuccessStatus: 200
};

_dotenv["default"].config();

app.use(cors(corsOptions));
app.use(_express["default"].json());
app.get('/', function (req, res) {
  res.send('The sedulous hyena ate the antelope!');
});
app.use('/auth', _authRouter.authRouter);
app.use('/user', _userRouter.userRouter);
app.use('/friend', _friendRouter.friendRouter);
console.log('mongodb+srv://natal_feliz:natal_feliz_a@cluster0.ieqvc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
mongoose.connect('mongodb+srv://natal_feliz:natal_feliz_a@cluster0.ieqvc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function () {
  console.log("Database connected!");
  app.listen(port, function () {
    console.log('Servidor rodando 1');
  });
});