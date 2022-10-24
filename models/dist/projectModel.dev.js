"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Project = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const imagesSchema = new mongoose.Schema(
//     {
//         projectId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Project",
//         },
//         image: {
//             type: String,
//         }
//       },
//       {
//         timestamps: true,
//       }
//     );
var projectSchema = new _mongoose["default"].Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  date1: {
    type: Date
  },
  images: {
    type: Object
  },
  technologies: {
    type: String
  },
  affiliation: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Organizations"
  },
  profile: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Profile"
  }
}, {
  timestamps: true
}); // const ProjectImage = mongoose.model("ProjectImage", imagesSchema);

var Project = _mongoose["default"].model("Project", projectSchema);

exports.Project = Project;