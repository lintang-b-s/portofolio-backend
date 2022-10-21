"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.putActivitiesById = exports.deleteActivitiesById = exports.getActivitesById = exports.postNewActivities = exports.getAllActivities = void 0;

var _activityModel = require("../models/activityModel.js");

var _organizationModel = require("../models/organizationModel.js");

var getAllActivities = function getAllActivities(req, res) {
  var activities;
  return regeneratorRuntime.async(function getAllActivities$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_activityModel.Activities.find({}).populate("affiliation", "name position date1 date2 activities projects").populate("profile", "name"));

        case 2:
          activities = _context.sent;

          if (activities) {
            _context.next = 6;
            break;
          }

          res.status(404);
          throw new Error("Activities tak ditemukan");

        case 6:
          res.json(activities);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}; //di formnya ditampilin jg list affiliationnnya agar bisa dipilih di req.bodynya postNewActivities


exports.getAllActivities = getAllActivities;

var postNewActivities = function postNewActivities(req, res) {
  var createdActivities;
  return regeneratorRuntime.async(function postNewActivities$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          createdActivities = new _activityModel.Activities(req.body);
          _context2.next = 4;
          return regeneratorRuntime.awrap(createdActivities);

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(createdActivities.save());

        case 6:
          res.status(201).json(createdActivities);
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(500).json({
            message: _context2.t0.message
          }));

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.postNewActivities = postNewActivities;

var getActivitesById = function getActivitesById(req, res) {
  var activities;
  return regeneratorRuntime.async(function getActivitesById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_activityModel.Activities.findById(req.params.id).populate("affiliation", "name position date1 date2 activities projects").populate("profile", "name"));

        case 3:
          activities = _context3.sent;

          if (activities) {
            _context3.next = 7;
            break;
          }

          res.status(404);
          throw new Error("Activities tidak ditemukan");

        case 7:
          return _context3.abrupt("return", res.json(activities));

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(500).json({
            message: _context3.t0.message
          }));

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.getActivitesById = getActivitesById;

var deleteActivitiesById = function deleteActivitiesById(req, res) {
  var activities;
  return regeneratorRuntime.async(function deleteActivitiesById$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_activityModel.Activities.findById(req.params.id));

        case 3:
          activities = _context4.sent;

          if (!activities) {
            _context4.next = 10;
            break;
          }

          _context4.next = 7;
          return regeneratorRuntime.awrap(activities.remove());

        case 7:
          res.json({
            message: "Activities diihapus"
          });
          _context4.next = 12;
          break;

        case 10:
          res.json(404);
          throw new Error("Activities tak ditemukan");

        case 12:
          _context4.next = 17;
          break;

        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", res.status(500).json({
            message: _context4.t0.message
          }));

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

exports.deleteActivitiesById = deleteActivitiesById;

var putActivitiesById = function putActivitiesById(req, res) {
  var affiliationList, _req$body, name, description, date1, date2, affiliation, profile, activities;

  return regeneratorRuntime.async(function putActivitiesById$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          affiliationList = _organizationModel.Organizations.find({}).select("_id");
          _req$body = req.body, name = _req$body.name, description = _req$body.description, date1 = _req$body.date1, date2 = _req$body.date2, affiliation = _req$body.affiliation, profile = _req$body.profile;
          _context5.next = 4;
          return regeneratorRuntime.awrap(_activityModel.Activities.findById(req.params.id));

        case 4:
          activities = _context5.sent;

          if (activities) {
            _context5.next = 8;
            break;
          }

          res.status(404);
          throw new Error("Proyek tak ditemukan");

        case 8:
          _context5.prev = 8;
          activities.name = name || activities.name;
          activities.description = description || activities.description;
          activities.date1 = date1 || activities.date1;
          activities.date2 = date2 || activities.date2;
          activities.profile = profile || activities.profile;
          activities.affiliation = affiliation || activities.affiliation;
          activities.profile = profile || activities.profile;
          console.log("req.body: \n", req.body);
          console.log("profile: ", profile);
          _context5.next = 20;
          return regeneratorRuntime.awrap(activities.save());

        case 20:
          res.json(activities);
          _context5.next = 26;
          break;

        case 23:
          _context5.prev = 23;
          _context5.t0 = _context5["catch"](8);
          return _context5.abrupt("return", res.status(500).json({
            message: _context5.t0.message
          }));

        case 26:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[8, 23]]);
};

exports.putActivitiesById = putActivitiesById;