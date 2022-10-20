import express from "express";
const router = express.Router();
import {
    getProfile
} from "../controllers/profile.js"

router.route("/").get(getProfile)

export default router;