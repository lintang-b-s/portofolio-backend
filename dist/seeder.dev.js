"use strict";

var _profile = _interopRequireDefault(require("./data/profile.js"));

var _organization = _interopRequireDefault(require("./data/organization.js"));

var _project = _interopRequireDefault(require("./data/project.js"));

var _organizationModel = require("./models/organizationModel.js");

var _profileModel = require("./models/profileModel.js");

var _projectModel = require("./models/projectModel.js");

var _db = _interopRequireDefault(require("./config/db.js"));

var _userModel = _interopRequireDefault(require("./models/userModel.js"));

var _user = _interopRequireDefault(require("./data/user.js"));

var _activities = _interopRequireDefault(require("./data/activities.js"));

var _activityModel = require("./models/activityModel.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(0, _db["default"])();

var importData = function importData() {
  var sampleTechnologies, sampleActivities, sampleProjects, sampleOrganizations, idOrganization, idProjects, idActivities, organiz, projt, actv, idProject, i, profiles, idProf;
  return regeneratorRuntime.async(function importData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_profileModel.Profile.deleteMany());

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(_projectModel.Project.deleteMany());

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(_organizationModel.Organizations.deleteMany());

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(_profileModel.Technologies.deleteMany());

        case 9:
          // await User.deleteMany();
          //kalo mau buat uuser harus ubah controlller nya buat tambahin kondisional (req.body.admin)
          // const buatUser = new User({
          //     username: `${user[0].username}`,
          //     password: `${user[0].password}`,
          //     admin: true,
          // })
          // await buatUser.save();
          sampleTechnologies = _profile["default"][0].technologies.map(function (tech) {
            return _objectSpread({}, tech);
          }); // const sampleProjectImages = projects[0].images.map((img) => {
          //     return { ...img};
          // })
          // await ProjectImage.insertMany(sampleProjectImages) 

          sampleActivities = _activities["default"].map(function (actvities) {
            return _objectSpread({}, _activities["default"]);
          });
          _context.next = 13;
          return regeneratorRuntime.awrap(_activityModel.Activities.insertMany(sampleActivities));

        case 13:
          sampleProjects = _project["default"].map(function (project) {
            return _objectSpread({}, project);
          });
          _context.next = 16;
          return regeneratorRuntime.awrap(_projectModel.Project.insertMany(sampleProjects));

        case 16:
          sampleOrganizations = _organization["default"].map(function (organization) {
            return _objectSpread({}, organization);
          });
          _context.next = 19;
          return regeneratorRuntime.awrap(_organizationModel.Organizations.insertMany(sampleOrganizations));

        case 19:
          _context.next = 21;
          return regeneratorRuntime.awrap(_organizationModel.Organizations.find({}).select("_id"));

        case 21:
          idOrganization = _context.sent;
          _context.next = 24;
          return regeneratorRuntime.awrap(_projectModel.Project.find({}).select("_id"));

        case 24:
          idProjects = _context.sent;
          _context.next = 27;
          return regeneratorRuntime.awrap(_activityModel.Activities.find({}).select("_id"));

        case 27:
          idActivities = _context.sent;
          _context.next = 30;
          return regeneratorRuntime.awrap(_projectModel.Project.find({}).select("_id"));

        case 30:
          idProject = _context.sent;

          for (i = 0; i < 1; i++) {
            organiz = idOrganization[i]._id;
            projt = idProjects[i]._id;
            actv = idActivities[i]._id;
          }

          profiles = new _profileModel.Profile({
            name: "".concat(_profile["default"][0].name),
            description: "".concat(_profile["default"][0].description),
            education: "".concat(_profile["default"][0].education),
            image: "".concat(_profile["default"][0].image),
            birthDate: "".concat(_profile["default"][0].birthDate),
            technologies: sampleTechnologies,
            organizations: organiz,
            projects: projt,
            activities: actv
          });
          _context.next = 35;
          return regeneratorRuntime.awrap(profiles.save());

        case 35:
          _context.next = 37;
          return regeneratorRuntime.awrap(_profileModel.Profile.find({}).populate("organizations", "name position date1 date2 activities projects").populate("projects", "name description date1 technologies affiliation"));

        case 37:
          idProf = _context.sent;
          console.log(idProf[0].organizations[0].name);
          console.log(idProf[0].projects);
          process.exit();
          _context.next = 47;
          break;

        case 43:
          _context.prev = 43;
          _context.t0 = _context["catch"](0);
          console.error("".concat(_context.t0));
          process.exit(1);

        case 47:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 43]]);
};

importData();