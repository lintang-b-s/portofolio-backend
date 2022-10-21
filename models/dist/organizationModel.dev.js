"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Organizations = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _projectModel = require("./projectModel.js");

var _activityModel = require("./activityModel.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var organizationSchema = new _mongoose["default"].Schema({
  name: {
    type: String
  },
  position: {
    type: String
  },
  date1: {
    type: Date
  },
  date2: {
    type: Date
  },
  images: {
    type: String
  },
  activities: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Activities"
  }],
  projects: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Project"
  }],
  profile: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Profile"
  }
}, {
  timestamps: true
});

var Organizations = _mongoose["default"].model("Organizations", organizationSchema);

exports.Organizations = Organizations;