import express from 'express';
var router = express.Router();
//tanpa cors
import bodyParser from "body-parser";
import passport from "passport";
import authenticate from "../authenticate.js";
import {
  getAllUser,
  userRegister,
  userLogin,
  checkJWTtoken,
  facebook
} from '../controllers/user.js';


router.use(bodyParser.json())


router.options('*', (req, res) => { res.sendStatus(200); });
router.get('/', authenticate.verifyUser, authenticate.verifyAdmin, getAllUser);

router.post('/signup', userRegister);
router.post('/login', userLogin);
router.get('/checkJWTtoken', checkJWTtoken);
router.get('/facebook/token', passport.authenticate('facebook-token'), facebook);




export default router;
