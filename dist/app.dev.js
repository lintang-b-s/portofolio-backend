"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _fs = _interopRequireDefault(require("fs"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _db = _interopRequireDefault(require("./config/db.js"));

var _errorMiddleware = require("./middleware/error.middleware.js");

var _projectRouter = _interopRequireDefault(require("./routes/projectRouter.js"));

var _contactRouter = _interopRequireDefault(require("./routes/contactRouter.js"));

var _aboutRouter = _interopRequireDefault(require("./routes/aboutRouter.js"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _sessionFileStore = _interopRequireDefault(require("session-file-store"));

var _passport = _interopRequireDefault(require("passport"));

var _authenticate = require("./authenticate.js");

var _adminRouter = _interopRequireDefault(require("./routes/adminRouter.js"));

var _usersRouter = _interopRequireDefault(require("./routes/usersRouter.js"));

var _uploadRouter = _interopRequireDefault(require("./routes/uploadRouter.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

(0, _db["default"])();
var app = (0, _express["default"])(); // view engine setup

app.use((0, _cors["default"])());
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
})); // app.use(express.urlencoded({ extended: false }));

app.use((0, _cookieParser["default"])());
app.use((0, _morgan["default"])('dev')); // const corsOptions = {
//   origin: 'http://localhost:3001/',
// }
// const configuredCors = cors(corsOptions);
// app.options('*', configuredCors)

app.use(function (error, req, res, next) {
  if (req.file) {
    _fs["default"].unlink(req.file.path, function (err) {
      console.log(err);
    });
  }

  if (res.headerSent) {
    return next(error);
  }
}); // const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(_passport["default"].initialize());
app.use('/api/upload', _uploadRouter["default"]);
app.use('/api/projects', _projectRouter["default"]);
app.use('/api/contacts', _contactRouter["default"]);
app.use('/api/about', _aboutRouter["default"]);
app.use('/api/admins', _adminRouter["default"]);
app.use('/api/users', _usersRouter["default"]);

var _dirname = _path["default"].resolve(); // yang bener yang atas


app.use(_express["default"]["static"](_dirname)); // app.use(express.static(path.join(__dirname + "/frontend")))

console.log("file: ", _dirname + "/frontend");
app.get('*', function (req, res) {
  return res.sendFile(_path["default"].join(_dirname, 'frontend/public/index.html'));
}); // cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

app.get("/", function (req, res) {
  res.send("API is running");
}); // catch 404 and forward to error handler

app.use(_errorMiddleware.notFound);
app.use(_errorMiddleware.errorHandler);
var PORT = 3001;
app.listen(PORT, console.log("Server running in ".concat(process.env.NODE_ENV, " mode on port ").concat(PORT)));
var _default = app;
exports["default"] = _default;