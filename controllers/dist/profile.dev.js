"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteProfileTechnologies = exports.createProfileTechnologies = exports.postProfile = exports.getProfileById = exports.putProfile = exports.getProfile = void 0;

var _profileModel = require("../models/profileModel.js");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _passport = _interopRequireDefault(require("passport"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _authenticate = require("../authenticate.js");

var _userModel = _interopRequireDefault(require("../models/userModel.js"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cloudinary = _interopRequireDefault(require("../config/cloudinary.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getProfile = function getProfile(req, res) {
  var profile;
  return regeneratorRuntime.async(function getProfile$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_profileModel.Profile.find({}).populate("organizations", "images name position date1 date2 activities projects").populate("projects", "name description date1 technologies affiliation").populate("activities", "name description date1 date2"));

        case 3:
          profile = _context.sent;
          res.json(profile);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(500).json({
            message: _context.t0.message
          }));

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getProfile = getProfile;

var postProfile = function postProfile(req, res) {
  var createdProfile;
  return regeneratorRuntime.async(function postProfile$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          createdProfile = new _profileModel.Profile(req.body);

          if (req.body.organizations) {
            createdProfile.organizations.push(req.body.affiliation);
          }

          if (req.body.projects) {
            createdProfile.projects.push(req.body.projects);
          }

          if (req.body.activities) {
            createdProfile.activities.push(req.body.activities);
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(createdProfile.save());

        case 7:
          res.status(201).json(createdProfile);
          _context2.next = 13;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(500).json({
            message: _context2.t0.message
          }));

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.postProfile = postProfile;

var getProfileById = function getProfileById(req, res) {
  var profile;
  return regeneratorRuntime.async(function getProfileById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_profileModel.Profile.findById(req.params.id).populate("organizations", "name position date1 date2 activities projects").populate("projects", "name description date1 technologies affiliation").populate("activities", "name description date1 date2"));

        case 3:
          profile = _context3.sent;
          res.json(profile);
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(500).json({
            message: _context3.t0.message
          }));

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getProfileById = getProfileById;

var putProfile = function putProfile(req, res) {
  var _req$body, name, description, education, birthDate, technologies, organizations, projects, activities, profile, uploadedResponse;

  return regeneratorRuntime.async(function putProfile$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, description = _req$body.description, education = _req$body.education, birthDate = _req$body.birthDate, technologies = _req$body.technologies, organizations = _req$body.organizations, projects = _req$body.projects, activities = _req$body.activities;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_profileModel.Profile.findById(req.params.id));

        case 3:
          profile = _context4.sent;

          if (profile) {
            _context4.next = 8;
            break;
          }

          res.status(404);
          console.log("tidak ditemukan profilenya");
          throw new Error("Profile tidak ditemukan");

        case 8:
          _context4.prev = 8;
          profile.name = name || profile.name;
          profile.description = description || profile.description;
          profile.education = education || profile.education;
          profile.birthDate = birthDate || profile.birthDate;
          profile.technologies = technologies || profile.technologies;
          _context4.next = 16;
          return regeneratorRuntime.awrap(_cloudinary["default"].uploader.upload(req.body.image, {
            upload_preset: "portofolio"
          }));

        case 16:
          uploadedResponse = _context4.sent;
          profile.image = uploadedResponse;
          console.log("uploadded image: ", uploadedResponse);

          if (req.body.organizations) {
            profile.organizations.push(req.body.organizations);
          } else {
            profile.organizations = profile.organizations;
          }

          if (req.body.projects) {
            profile.projects.push(req.body.projects);
          } else {
            profile.projects = profile.projects;
          }

          if (req.body.activities) {
            profile.activities.push(req.body.activities);
          } else {
            profile.activities = profile.activities;
          }

          console.log(uploadedResponse);
          _context4.next = 25;
          return regeneratorRuntime.awrap(profile.save());

        case 25:
          console.log("akan save profile");
          return _context4.abrupt("return", res.json(profile));

        case 29:
          _context4.prev = 29;
          _context4.t0 = _context4["catch"](8);
          return _context4.abrupt("return", res.status(500).json({
            message: _context4.t0.message
          }));

        case 32:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[8, 29]]);
}; //@desc menambah technologies
//@route POST /api/adins/profile/:id/technologies


exports.putProfile = putProfile;

var createProfileTechnologies = function createProfileTechnologies(req, res) {
  var profile, uploadedResponse, newTech;
  return regeneratorRuntime.async(function createProfileTechnologies$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(_profileModel.Profile.findById(req.params.id));

        case 2:
          profile = _context5.sent;

          if (profile) {
            _context5.next = 6;
            break;
          }

          res.status(404);
          throw new Error("Profile not found");

        case 6:
          _context5.prev = 6;
          _context5.next = 9;
          return regeneratorRuntime.awrap(_cloudinary["default"].uploader.upload(req.body.images, {
            upload_preset: "portofolio"
          }));

        case 9:
          uploadedResponse = _context5.sent;
          newTech = new _profileModel.Technologies({
            profileId: profile._id,
            name: req.body.name,
            images: uploadedResponse
          });
          console.log("profile id: ", profile._id);
          console.log("name tech: ", req.body.name);
          console.log("file path: ", uploadedResponse);
          profile.technologies.push(newTech);
          profile.save();
          res.json(profile);
          _context5.next = 23;
          break;

        case 19:
          _context5.prev = 19;
          _context5.t0 = _context5["catch"](6);
          res.status(500);
          throw new Error(_context5.t0);

        case 23:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[6, 19]]);
}; //@desc menghapus technologies
//@route POST /api/admins/profile/:id/:technologies_id


exports.createProfileTechnologies = createProfileTechnologies;

var deleteProfileTechnologies = function deleteProfileTechnologies(req, res) {
  var profile;
  return regeneratorRuntime.async(function deleteProfileTechnologies$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(_profileModel.Profile.findById(req.params.id));

        case 2:
          profile = _context6.sent;

          if (profile) {
            _context6.next = 6;
            break;
          }

          res.status(404);
          throw new Error("Profile not found.");

        case 6:
          profile.technologies.id(req.params.technologies_id).remove();
          profile.save();
          res.send({
            msg: "tech removed",
            profile: profile
          });

        case 9:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.deleteProfileTechnologies = deleteProfileTechnologies;