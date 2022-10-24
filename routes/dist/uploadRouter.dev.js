"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _multer = _interopRequireDefault(require("multer"));

var _streamifier = _interopRequireDefault(require("streamifier"));

var _authenticate = require("../authenticate.js");

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _fs = _interopRequireDefault(require("fs"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import { v2 as cloudinary } from 'cloudinary';
if (process.env.NODE_ENV !== "production") {
  var _dirname = _path["default"].resolve();

  _dotenv["default"].config({
    path: _path["default"].resolve(_dirname, 'backend/.env')
  });
}

var router = _express["default"].Router(); // cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET
// })


_cloudinary["default"].config({
  cloud_name: "tutorial-lntng",
  api_key: "527882248559533",
  api_secret: "RTXSrXqpaoR-5STxofLERpGTfmk"
});

var upload = (0, _multer["default"])();
router.post('/upload', _authenticate.verifyUser, _authenticate.verifyAdmin, function (req, res) {
  try {
    if (!req.files || Object.keys(req.files).length === 0) return res.status(400).json({
      msg: 'No files were uploaded.'
    });
    var file = req.files.file;

    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({
        msg: "Size too large"
      });
    }

    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      removeTmp(file.tempFilePath);
      return res.status(400).json({
        msg: "File format is incorrect."
      });
    }

    _cloudinary["default"].v2.uploader.upload(file.tempFilePath, {
      folder: "portofolio"
    }, function _callee(err, result) {
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!err) {
                _context.next = 2;
                break;
              }

              throw err;

            case 2:
              removeTmp(file.tempFilePath);
              res.json({
                public_id: result.public_id,
                url: result.secure_url
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      });
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message
    });
  }
}); // Delete image only admin can use

router.post('/destroy', _authenticate.verifyUser, _authenticate.verifyAdmin, function (req, res) {
  try {
    var public_id = req.body.public_id;
    if (!public_id) return res.status(400).json({
      msg: 'No images Selected'
    });

    _cloudinary["default"].v2.uploader.destroy(public_id, function _callee2(err, result) {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!err) {
                _context2.next = 2;
                break;
              }

              throw err;

            case 2:
              res.json({
                msg: "Deleted Image"
              });

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      });
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message
    });
  }
});

var removeTmp = function removeTmp(path) {
  _fs["default"].unlink(path, function (err) {
    if (err) throw err;
  });
};

var _default = router;
exports["default"] = _default;