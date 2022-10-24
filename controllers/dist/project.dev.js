"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteProjectImages = exports.updateProjectImages = exports.createProjectImages = exports.putProjectById = exports.deleteProjectById = exports.postNewProject = exports.getProjectById = exports.getAllProjects = void 0;

var _projectModel = require("../models/projectModel.js");

var _formidable = _interopRequireDefault(require("formidable"));

var _fs = _interopRequireDefault(require("fs"));

var _organizationModel = require("../models/organizationModel.js");

var _profileModel = require("../models/profileModel.js");

var _cloudinary = _interopRequireDefault(require("../config/cloudinary.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllProjects = function getAllProjects(req, res) {
  var projects;
  return regeneratorRuntime.async(function getAllProjects$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_projectModel.Project.find({}).populate("affiliation", "_id name position date1 date2 activities projects").populate("profile", "_id name"));

        case 3:
          projects = _context.sent;

          if (projects) {
            _context.next = 7;
            break;
          }

          res.status(404);
          throw new Error("TIdak ditemukan Projects");

        case 7:
          res.json(projects);
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

exports.getAllProjects = getAllProjects;

var getProjectById = function getProjectById(req, res) {
  var project;
  return regeneratorRuntime.async(function getProjectById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_projectModel.Project.findById(req.params.id).populate("affiliation", "name position ").populate("profile", "name"));

        case 3:
          project = _context2.sent;

          if (project) {
            _context2.next = 7;
            break;
          }

          res.status(404);
          throw new Error("project yang anda cari tidak ditemukan");

        case 7:
          res.json(project);
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

exports.getProjectById = getProjectById;

var postNewProject = function postNewProject(req, res) {
  var uploadedResponse, newProject;
  return regeneratorRuntime.async(function postNewProject$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_cloudinary["default"].uploader.upload(req.body.images, {
            upload_preset: "portofolio"
          }));

        case 3:
          uploadedResponse = _context3.sent;
          req.body.images = uploadedResponse;
          newProject = new _projectModel.Project(req.body);
          _context3.next = 8;
          return regeneratorRuntime.awrap(newProject.save());

        case 8:
          res.status(201).json(newProject);
          _context3.next = 14;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(500).json({
            message: _context3.t0.message
          }));

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.postNewProject = postNewProject;

var deleteProjectById = function deleteProjectById(req, res) {
  var project;
  return regeneratorRuntime.async(function deleteProjectById$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_projectModel.Project.findById(req.params.id));

        case 3:
          project = _context4.sent;

          if (!project) {
            _context4.next = 10;
            break;
          }

          _context4.next = 7;
          return regeneratorRuntime.awrap(project.remove());

        case 7:
          res.json({
            message: "Project dihapus "
          });
          _context4.next = 12;
          break;

        case 10:
          res.json(404);
          throw new Error("Project tidak ditemukan!");

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

exports.deleteProjectById = deleteProjectById;

var putProjectById = function putProjectById(req, res) {
  var _req$body, name, description, date1, images, technologies, affiliation, profile, project, uploadedResponse;

  return regeneratorRuntime.async(function putProjectById$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, description = _req$body.description, date1 = _req$body.date1, images = _req$body.images, technologies = _req$body.technologies, affiliation = _req$body.affiliation, profile = _req$body.profile;
          console.log("reqbody: ", req.body);
          _context5.next = 4;
          return regeneratorRuntime.awrap(_projectModel.Project.findById(req.params.id));

        case 4:
          project = _context5.sent;

          if (project) {
            _context5.next = 8;
            break;
          }

          res.status(404);
          throw new Error("Projject tak ditemukan");

        case 8:
          _context5.prev = 8;
          project.name = name || project.name;
          project.description = description || project.description;
          project.date1 = date1 || project.date1; // if (req.file) {
          //     project.images = req.file.path
          // }else{
          //     project.images = project.images;
          // }

          project.technologies = technologies || project.technologies;
          project.affiliation = affiliation || project.affiliation;
          project.profile = profile || project.profile;
          _context5.next = 17;
          return regeneratorRuntime.awrap(_cloudinary["default"].uploader.upload(req.body.images, {
            upload_preset: "portofolio"
          }));

        case 17:
          uploadedResponse = _context5.sent;
          project.images = uploadedResponse;
          console.log("reqbody: ", req.body); // console.log("req.file.path: ", req.file.path)

          _context5.next = 22;
          return regeneratorRuntime.awrap(project.save());

        case 22:
          res.json(project);
          _context5.next = 28;
          break;

        case 25:
          _context5.prev = 25;
          _context5.t0 = _context5["catch"](8);
          return _context5.abrupt("return", res.status(500).json({
            message: _context5.t0.message
          }));

        case 28:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[8, 25]]);
}; //@route POST /api/projects/:id/images
//@desk membuat gambar projects


exports.putProjectById = putProjectById;

var createProjectImages = function createProjectImages(req, res) {
  var project, newImages;
  return regeneratorRuntime.async(function createProjectImages$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(_projectModel.Project.findById(req.params.id));

        case 2:
          project = _context6.sent;

          if (project) {
            _context6.next = 6;
            break;
          }

          res.status(404);
          throw new Error("Project tak ditemukan");

        case 6:
          _context6.prev = 6;
          newImages = new ProjectImage({
            projectId: project._id,
            image: req.body.image
          });
          project.images.push(newImages);
          project.save();
          res.json(project);
          _context6.next = 16;
          break;

        case 13:
          _context6.prev = 13;
          _context6.t0 = _context6["catch"](6);
          return _context6.abrupt("return", res.status(500).json({
            message: _context6.t0.message
          }));

        case 16:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[6, 13]]);
}; //@desc     menghapus project images
//@route    DELETE /api/projects/:id/:images_id


exports.createProjectImages = createProjectImages;

var deleteProjectImages = function deleteProjectImages(req, res) {
  var project;
  return regeneratorRuntime.async(function deleteProjectImages$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(_projectModel.Project.findById(req.params.id));

        case 2:
          project = _context7.sent;

          if (project) {
            _context7.next = 6;
            break;
          }

          res.status(404);
          throw new Error("Project not found.");

        case 6:
          _context7.prev = 6;
          project.images.id(req.params.images_id).remove();
          project.save();
          res.send({
            msg: "gambar project dihapus",
            project: project
          });
          _context7.next = 15;
          break;

        case 12:
          _context7.prev = 12;
          _context7.t0 = _context7["catch"](6);
          return _context7.abrupt("return", res.status(500).json({
            message: _context7.t0.message
          }));

        case 15:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[6, 12]]);
}; //@desc     edit gambar project 
//@route    PUT /api/projects/:id/:images_id/edit


exports.deleteProjectImages = deleteProjectImages;

var updateProjectImages = function updateProjectImages(req, res) {
  var project, imageObj;
  return regeneratorRuntime.async(function updateProjectImages$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(_projectModel.Project.findById(req.params.id));

        case 2:
          project = _context8.sent;

          if (project) {
            _context8.next = 6;
            break;
          }

          res.status(404);
          throw new Error("Project not found.");

        case 6:
          imageObj = project.images.find(function (_ref) {
            var id = _ref.id;
            return id === req.params.images_id;
          });

          if (!(imageObj === undefined)) {
            _context8.next = 10;
            break;
          }

          res.status(500);
          throw new Error("Images project tak ditemukan");

        case 10:
          if (req.body.image === "") {
            imageObj.image = "";
          }

          imageObj.image = req.body.image || imageObj.image;
          project.save();
          res.send({
            msg: "Gambar Project diperbarui "
          });

        case 14:
        case "end":
          return _context8.stop();
      }
    }
  });
};

exports.updateProjectImages = updateProjectImages;