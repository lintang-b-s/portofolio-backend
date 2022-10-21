"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

if (process.env.NODE_ENV !== "production") {
  var _dirname = _path["default"].resolve();

  _dotenv["default"].config({
    path: _path["default"].resolve(_dirname, 'backend/.env')
  });
}

var dbUrl = process.env.DB_URL;

var connectDB = function connectDB() {
  var conn;
  return regeneratorRuntime.async(function connectDB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log(dbUrl);
          console.log(process.env.DB_URL);
          console.log(process.env.NODE_ENV);
          _context.next = 6;
          return regeneratorRuntime.awrap(_mongoose["default"].connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }));

        case 6:
          conn = _context.sent;
          console.log("MongoDB Connected: ".concat(conn.connection.host));
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.error("Error: ".concat(_context.t0.message));
          process.exit(1);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

var _default = connectDB;
exports["default"] = _default;