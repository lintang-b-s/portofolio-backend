import  express from "express" ;
const router = express.Router();
import {
    getProfile,
    putProfile
} from "../controllers/profile.js"
import {
    getAllProjects,
    getProjectById,
    postNewProject,
    deleteProjectById,
    putProjectById

} from "../controllers/project.js"

import {
    getAllOrganizations,
    postNewOrganization,
    getOrganizationById,
    deleteOrganizationById,
    putOrganizationById,

} from "../controllers/organization.js"

import {
    getAllActivities,
    postNewActivities,
    getActivitesById,
    deleteActivitiesById,
    putActivitiesById
} from "../controllers/activitie.js"

import authenticate from "../authenticate.js";


//mengupdate profile
router.route("/profile")
    .get(getProfile)
    .put( authenticate.verifyUser, authenticate.verifyAdmin, putProfile)
    

//mengupdate projects
router.route("/projects")
    .get(getAllProjects)
    .post(postNewProject)

router.route("/projects/:id")
    .get(getProjectById)
    .put( authenticate.verifyUser, authenticate.verifyAdmin, putProjectById)
    .delete(  authenticate.verifyUser, authenticate.verifyAdmin, deleteProjectById)

//mengupdate org
router.route("/organizations")
    .get(getAllOrganizations)
    .post(authenticate.verifyUser, authenticate.verifyAdmin, postNewOrganization)

router.route("/organizations/:id")
    .get(getOrganizationById)
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, deleteOrganizationById)
    .put(authenticate.verifyUser, authenticate.verifyAdmin, putOrganizationById)

//mengupdate activity
router.route("/activities")
    .get(getAllActivities)
    .post(authenticate.verifyUser, authenticate.verifyAdmin, postNewActivities)

router.route("/activities/:id")
    .get(getActivitesById)
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, deleteActivitiesById)
    .put(authenticate.verifyUser, authenticate.verifyAdmin, putActivitiesById)




export default router;