import express from 'express';
var router = express.Router();
//tanpa cors
import bodyParser from "body-parser";
import passport from "passport";
import {getToken, jwtPassport, verifyUser, verifyAdmin} from "../authenticate.js";
import config from  '../config.js' ;
import {
  getAllUser,
  userRegister,
  userLogin,
  checkJWTtoken
} from '../controllers/user.js';


router.use(bodyParser.json())


router.options('*', (req, res) => { res.sendStatus(200); });
router.get('/', verifyUser, verifyAdmin, getAllUser);

router.post('/signup', userRegister);
router.post('/login', userLogin);
router.get('/checkJWTtoken', checkJWTtoken);
// router.get('/google/token', passport.authenticate('google-token'), google);

// router.get("/google", passport.authenticate("google", { scope: ["profile"] }),  google);
// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: config.google.clientId,
//     failureRedirect: "/login/failed",
//   })
// ); 


export default router;
