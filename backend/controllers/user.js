import { Profile } from "../models/profileModel.js"

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import passport from "passport";
import bodyParser from "body-parser";
import {getToken, jwtPassport, verifyUser, verifyAdmin} from "../authenticate.js";

import User from "../models/userModel.js";
import mongoose from "mongoose";

//gak usah dipakai 
const getAllUser = function(req, res, next) {
    User.find({})
    .then((users) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(users);
    }, (err) => next(err))
    .catch((err) => next(err));
  }

const userRegister = (req, res, next) => {
    User.register(new User({ username: req.body.username}),
    req.body.password, (err, user) => {
        if(err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({err: err});
        }
        else {
            if (req.body.firstname) {
                user.firstname = req.body.firstname;
            }
            if (req.body.lastname) {
                user.lastname = req.body.lastname;
            }
            if (req.body.admin) {
                user.admin = req.body.admin;
            }
            user.save((err, user) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({err: err});
                    return ;
                }
                passport.authenticate('local')(req, res, () => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: true, status: 'Registrasi Sukses!'});
                });
                
            });
        }
    } );
};

//sebelumnya di setiap res.json gak pake return
// const userLogin = (req, res, next) => {
//     passport.authenticate('local', (req, res, info) => {

//         let token = getToken({_id: req.user._id})
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json({success: true, token: token, status: 'You are successfully logged in!'});
//     }) (req, res, next);
// }

const userLogin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        req.logIn(user, () => {
            let token = getToken({_id: req.user._id})
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, token: token, status: 'You are successfully logged in!'});

        })
        
    }) (req, res, next);
}


//itu yang arr func (req,res,next) terakhir buat apa ?

const checkJWTtoken = (req, res) => {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err)
          return next(err);
        
        if (!user) {
          res.statusCode = 401;
          res.setHeader('Content-Type', 'application/json');
          return res.json({status: 'JWT invalid! kamu belum login!', success: false, err: info});
        }
        else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          return res.json({status: 'JWT valid!', success: true, user: user});
    
        }
      }) (req, res);
}




export { getAllUser, userRegister, userLogin, checkJWTtoken};