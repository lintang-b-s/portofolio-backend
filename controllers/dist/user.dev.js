"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkJWTtoken = exports.userLogin = exports.userRegister = exports.getAllUser = void 0;

var _profileModel = require("../models/profileModel.js");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _passport = _interopRequireDefault(require("passport"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _authenticate = require("../authenticate.js");

var _userModel = _interopRequireDefault(require("../models/userModel.js"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//gak usah dipakai 
var getAllUser = function getAllUser(req, res, next) {
  _userModel["default"].find({}).then(function (users) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(users);
  }, function (err) {
    return next(err);
  })["catch"](function (err) {
    return next(err);
  });
};

exports.getAllUser = getAllUser;

var userRegister = function userRegister(req, res, next) {
  _userModel["default"].register(new _userModel["default"]({
    username: req.body.username
  }), req.body.password, function (err, user) {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({
        err: err
      });
    } else {
      if (req.body.firstname) {
        user.firstname = req.body.firstname;
      }

      if (req.body.lastname) {
        user.lastname = req.body.lastname;
      } // if (req.body.admin) {
      //     user.admin = req.body.admin;
      // }


      user.save(function (err, user) {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({
            err: err
          });
          return;
        }

        _passport["default"].authenticate('local')(req, res, function () {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({
            success: true,
            status: 'Registrasi Sukses!'
          });
        });
      });
    }
  });
}; //sebelumnya di setiap res.json gak pake return
// const userLogin = (req, res, next) => {
//     passport.authenticate('local', (req, res, info) => {
//         let token = getToken({_id: req.user._id})
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json({success: true, token: token, status: 'You are successfully logged in!'});
//     }) (req, res, next);
// }


exports.userRegister = userRegister;

var userLogin = function userLogin(req, res, next) {
  _passport["default"].authenticate('local', function (err, user, info) {
    req.logIn(user, function () {
      var token = (0, _authenticate.getToken)({
        _id: req.user._id
      });
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({
        success: true,
        token: token,
        status: 'You are successfully logged in!'
      });
    });
  })(req, res, next);
}; //itu yang arr func (req,res,next) terakhir buat apa ?


exports.userLogin = userLogin;

var checkJWTtoken = function checkJWTtoken(req, res) {
  _passport["default"].authenticate('jwt', {
    session: false
  }, function (err, user, info) {
    if (err) return next(err);

    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      return res.json({
        status: 'JWT invalid! kamu belum login!',
        success: false,
        err: info
      });
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.json({
        status: 'JWT valid!',
        success: true,
        user: user
      });
    }
  })(req, res);
};

exports.checkJWTtoken = checkJWTtoken;