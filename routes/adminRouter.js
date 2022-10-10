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
} from "../controllers/activities.js"

import {getToken, jwtPassport, verifyUser, verifyAdmin, facebookPassport} from "../authenticate.js";


//mengupdate profile
router.route("/profile")
    .get(getProfile)
    
router.route("/profile/:id")
    .put(  verifyUser,  verifyAdmin, putProfile)    

//mengupdate projects
router.route("/projects")
    .get(getAllProjects)
    .post(postNewProject)

router.route("/projects/:id")
    .get(getProjectById)
    .put(  verifyUser,  verifyAdmin, putProjectById)
    .delete(   verifyUser,  verifyAdmin, deleteProjectById)
//sudah ku tes

//mengupdate org
router.route("/organizations")
    .get(getAllOrganizations)
    .post( verifyUser,  verifyAdmin, postNewOrganization)

router.route("/organizations/:id")
    .get(getOrganizationById)
    .delete( verifyUser,  verifyAdmin, deleteOrganizationById)
    .put( verifyUser,  verifyAdmin, putOrganizationById)
//sudah ku tes

//mengupdate activity
//gak ada data activities
router.route("/activities")
    .get(getAllActivities)
    .post( verifyUser,  verifyAdmin, postNewActivities)


router.route("/activities/:id")
    .get(getActivitesById)
    .delete( verifyUser,  verifyAdmin, deleteActivitiesById)
    .put( verifyUser,  verifyAdmin, putActivitiesById)
//sudah ku tes 

/* bisa semua ,tapi kok ra sinau uts prg to*/



export default router;