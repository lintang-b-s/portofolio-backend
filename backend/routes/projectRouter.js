import  express from "express" ;
const router = express.Router();


import {
    getAllProjects,
    getProjectById,

} from "../controllers/project.js"

router.route("/").get(getAllProjects)
router.route("/:id").get(getProjectById)

export default router;

