"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Activities = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var activitySchema = new _mongoose["default"].Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  date1: {
    type: Date
  },
  date2: {
    type: Date
  },
  profile: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Profile"
  },
  affiliation: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Organizations"
  }
}, {
  timestamps: true
});

var Activities = _mongoose["default"].model("Activities", activitySchema);

exports.Activities = Activities;