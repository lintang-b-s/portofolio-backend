import  express from "express" ;
const router = express.Router();
import {
    getProfile,
    putProfile,
    getProfileById,
    postProfile,
    createProfileTechnologies, deleteProfileTechnologies
} from "../controllers/profile.js"
import {
    getAllProjects,
    getProjectById,
    postNewProject,
    deleteProjectById,
    putProjectById,
    createProjectImages, 
    updateProjectImages, 
    deleteProjectImages

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

import {getToken, jwtPassport, verifyUser, verifyAdmin} from "../authenticate.js";
import { fileUpload } from "../middleware/file-upload.js"
import multer from "multer";
import cors from "cors"
const upload = multer()



//mengupdate profile
router.route("/profiles")
    .get(getProfile)
    .post(verifyUser,  verifyAdmin,postProfile)
     
router.route("/profiles/:id")
    .get( getProfileById)
    .put(  verifyUser,  verifyAdmin,fileUpload.single('image'), putProfile)    

router.route("/profiles/:id/technologies").post(verifyUser,  verifyAdmin, fileUpload.single('images'), createProfileTechnologies);

router.route("/profiles/:id/:technologies_id").delete(verifyUser,  verifyAdmin, deleteProfileTechnologies)

//mengupdate projects
router.route("/projects")
    .get(getAllProjects)
    .post(fileUpload.single('images'), postNewProject)

router.route("/projects/:id")
    .get(getProjectById)
    .put(  verifyUser,  verifyAdmin,fileUpload.single('images'), putProjectById)
    .delete(   verifyUser,  verifyAdmin, deleteProjectById)
    .post( verifyUser,  verifyAdmin, putProjectById)

// router.route("/projects/:id/images").post( verifyUser,  verifyAdmin, createProjectImages)

// router.route("/projects/:id/:images_id").delete(verifyUser,  verifyAdmin, deleteProjectImages);

// router.route("/projects/:id/:images_id/edit").put(verifyUser,  verifyAdmin, updateProjectImages )
// //sudah ku tes

//mengupdate org
router.route("/organizations")
    .get(getAllOrganizations)
    .post( verifyUser,  verifyAdmin,fileUpload.single('images'), postNewOrganization)

router.route("/organizations/:id")
    .get(getOrganizationById)
    .delete( verifyUser,  verifyAdmin, deleteOrganizationById)
    .put( verifyUser,  verifyAdmin,fileUpload.single('images'), putOrganizationById)
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






export default router;