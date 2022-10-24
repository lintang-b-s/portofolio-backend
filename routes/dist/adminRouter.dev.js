"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _profile = require("../controllers/profile.js");

var _project = require("../controllers/project.js");

var _organization = require("../controllers/organization.js");

var _activities = require("../controllers/activities.js");

var _authenticate = require("../authenticate.js");

var _fileUpload = require("../middleware/file-upload.js");

var _multer = _interopRequireDefault(require("multer"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var upload = (0, _multer["default"])(); //mengupdate profile

router.route("/profiles").get(_profile.getProfile).post(_authenticate.verifyUser, _authenticate.verifyAdmin, _profile.postProfile);
router.route("/profiles/:id").get(_profile.getProfileById).put(_authenticate.verifyUser, _authenticate.verifyAdmin, _fileUpload.fileUpload.single('image'), _profile.putProfile);
router.route("/profiles/:id/technologies").post(_authenticate.verifyUser, _authenticate.verifyAdmin, _fileUpload.fileUpload.single('images'), _profile.createProfileTechnologies);
router.route("/profiles/:id/:technologies_id")["delete"](_authenticate.verifyUser, _authenticate.verifyAdmin, _profile.deleteProfileTechnologies); //mengupdate projects

router.route("/projects").get(_project.getAllProjects).post(_fileUpload.fileUpload.single('images'), _project.postNewProject);
router.route("/projects/:id").get(_project.getProjectById).put(_authenticate.verifyUser, _authenticate.verifyAdmin, _fileUpload.fileUpload.single('images'), _project.putProjectById)["delete"](_authenticate.verifyUser, _authenticate.verifyAdmin, _project.deleteProjectById).post(_authenticate.verifyUser, _authenticate.verifyAdmin, _project.putProjectById); // router.route("/projects/:id/images").post( verifyUser,  verifyAdmin, createProjectImages)
// router.route("/projects/:id/:images_id").delete(verifyUser,  verifyAdmin, deleteProjectImages);
// router.route("/projects/:id/:images_id/edit").put(verifyUser,  verifyAdmin, updateProjectImages )
// //sudah ku tes
//mengupdate org

router.route("/organizations").get(_organization.getAllOrganizations).post(_authenticate.verifyUser, _authenticate.verifyAdmin, _fileUpload.fileUpload.single('images'), _organization.postNewOrganization);
router.route("/organizations/:id").get(_organization.getOrganizationById)["delete"](_authenticate.verifyUser, _authenticate.verifyAdmin, _organization.deleteOrganizationById).put(_authenticate.verifyUser, _authenticate.verifyAdmin, _fileUpload.fileUpload.single('images'), _organization.putOrganizationById); //sudah ku tes
//mengupdate activity
//gak ada data activities

router.route("/activities").get(_activities.getAllActivities).post(_authenticate.verifyUser, _authenticate.verifyAdmin, _activities.postNewActivities);
router.route("/activities/:id").get(_activities.getActivitesById)["delete"](_authenticate.verifyUser, _authenticate.verifyAdmin, _activities.deleteActivitiesById).put(_authenticate.verifyUser, _authenticate.verifyAdmin, _activities.putActivitiesById); //sudah ku tes 

var _default = router;
exports["default"] = _default;