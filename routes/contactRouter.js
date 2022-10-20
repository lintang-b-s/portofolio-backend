import  express from "express" ;
const router = express.Router();
import {
    postNewContactForm
} from "../controllers/contact.js"

router.route("/").post(postNewContactForm)


export default router;