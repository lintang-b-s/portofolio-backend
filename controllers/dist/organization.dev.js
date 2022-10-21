"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.putOrganizationById = exports.deleteOrganizationById = exports.getOrganizationById = exports.postNewOrganization = exports.getAllOrganizations = void 0;

var _utils = require("mquery/lib/utils.js");

var _organizationModel = require("../models/organizationModel.js");

var getAllOrganizations = function getAllOrganizations(req, res) {
  var organizations;
  return regeneratorRuntime.async(function getAllOrganizations$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_organizationModel.Organizations.find({}).populate("projects", "name description date1 technologies affiliation").populate("activities", "name description date1 date2").populate("profile", "name"));

        case 3:
          organizations = _context.sent;

          if (organizations) {
            _context.next = 7;
            break;
          }

          res.status(404);
          throw new Error("daftar org tidak ditemukan");

        case 7:
          res.json(organizations);
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(500).json({
            message: _context.t0.message
          }));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.getAllOrganizations = getAllOrganizations;

var postNewOrganization = function postNewOrganization(req, res) {
  var createdOrganization;
  return regeneratorRuntime.async(function postNewOrganization$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;

          if (req.file) {
            req.body.images = req.file.path;
          } else {
            req.body.images = " ";
          } //salah


          createdOrganization = new _organizationModel.Organizations(req.body);

          if (req.body.activities) {
            createdOrganization.activities.push(req.body.activities);
          }

          if (req.body.projects) {
            createdOrganization.projects.push(req.body.projects);
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(createdOrganization.save());

        case 7:
          res.status(201).json(createdOrganization);
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
}; // adayang lsaah di getorganizationbyid


exports.postNewOrganization = postNewOrganization;

var getOrganizationById = function getOrganizationById(req, res) {
  var organization;
  return regeneratorRuntime.async(function getOrganizationById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          console.log("coba bisa gak ");
          _context3.next = 4;
          return regeneratorRuntime.awrap(_organizationModel.Organizations.findById(req.params.id).populate("projects", "name description date1 technologies affiliation").populate("activities", "name description date1 date2").populate("profile", "name"));

        case 4:
          organization = _context3.sent;
          console.log("kalo keluar berarti bisa querynya");

          if (organization) {
            _context3.next = 9;
            break;
          }

          res.status(404);
          throw new Error("Organization tidak ditemukan");

        case 9:
          return _context3.abrupt("return", res.json(organization));

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(500).json({
            message: _context3.t0.message
          }));

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.getOrganizationById = getOrganizationById;

var putOrganizationById = function putOrganizationById(req, res) {
  var _req$body, name, position, date1, date2, images, activities, projects, profile, organization;

  return regeneratorRuntime.async(function putOrganizationById$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, position = _req$body.position, date1 = _req$body.date1, date2 = _req$body.date2, images = _req$body.images, activities = _req$body.activities, projects = _req$body.projects, profile = _req$body.profile;
          console.log("reqbody: ", req.body);
          _context4.next = 4;
          return regeneratorRuntime.awrap(_organizationModel.Organizations.findById(req.params.id));

        case 4:
          organization = _context4.sent;

          if (organization) {
            _context4.next = 8;
            break;
          }

          res.status(404);
          throw new Error("Org tidak ditemukan");

        case 8:
          _context4.prev = 8;
          organization.name = name || organization.name;
          organization.position = position || organization.position;
          organization.date1 = date1 || organization.date1;

          if (date2) {
            organization.date2 = date2;
          }

          organization.date2 = organization.date2;

          if (req.file) {
            organization.images = req.file.path;
          } else {
            organization.images = organization.images;
          }

          if (activities) {
            organization.activities.push(activities);
          } // organization.activities = activities || organization.activities;


          if (projects) {
            organization.projects.push(projects);
          } // organization.projects = projects || organization.projects;


          organization.profile = profile || organization.profile;
          console.log("reqbody: ", req.body);
          console.log("namey: ", name);
          console.log("positiony: ", position);
          console.log("date1y: ", date1);
          console.log("date2y: ", date2); // console.log("req.file.pathy: ",req.file.path)

          console.log("namey: ", name);
          console.log("activitiesy: ", activities);
          console.log("projectsy: ", projects);
          console.log("profiley: ", profile);
          _context4.next = 29;
          return regeneratorRuntime.awrap(organization.save());

        case 29:
          console.log("reqbody: ", req.body);
          res.json(organization);
          _context4.next = 36;
          break;

        case 33:
          _context4.prev = 33;
          _context4.t0 = _context4["catch"](8);
          return _context4.abrupt("return", res.status(500).json({
            message: _context4.t0.message
          }));

        case 36:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[8, 33]]);
};

exports.putOrganizationById = putOrganizationById;

var deleteOrganizationById = function deleteOrganizationById(req, res) {
  var organization;
  return regeneratorRuntime.async(function deleteOrganizationById$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(_organizationModel.Organizations.findById(req.params.id));

        case 2:
          organization = _context5.sent;

          if (!organization) {
            _context5.next = 9;
            break;
          }

          _context5.next = 6;
          return regeneratorRuntime.awrap(organization.remove());

        case 6:
          res.json({
            messsage: "Org dihapus"
          });
          _context5.next = 11;
          break;

        case 9:
          res.json(404);
          throw new Error("Org tak ditemukan");

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.deleteOrganizationById = deleteOrganizationById;