"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Profile = exports.Technologies = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _organizationModel = require("./organizationModel.js");

var _projectModel = require("./projectModel.js");

var _activityModel = require("./activityModel.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var technologiesSchema = new _mongoose["default"].Schema({
  /*
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile"
  }
  */
  profileId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: "Profile"
  },
  name: {
    type: String,
    required: true
  },
  images: {
    type: String
  }
}, {
  timestamps: true
});
var profileSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  education: {
    type: String
  },
  image: {
    type: String
  },
  birthDate: {
    type: Date
  },
  technologies: [technologiesSchema],
  organizations: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Organizations"
  }],
  projects: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Project"
  }],
  activities: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Activities"
  }]
}, {
  timestamps: true
});

var Technologies = _mongoose["default"].model("Technologie", technologiesSchema);

exports.Technologies = Technologies;

var Profile = _mongoose["default"].model("Profile", profileSchema);

exports.Profile = Profile;