import { Profile } from "../models/profileModel.js"

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import passport from "passport";
import bodyParser from "body-parser";
import authenticate from "../authenticate";
import User from "../models/userModel";
import mongoose from "mongoose";

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


const userLogin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) 
            return next(err)
        if (!user) {
            res.statusCode = 401;
            res.setHeader('Content-Type', "application/json");
            res.json({success: false, status: "Login tidak berhasil", err: info});
        }
        req.logIn(user, (err) => {
            if (err) {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                res.json({success: false, status: 'Login Unsuccessful!', err: 'Could not log in user!'});          
              }
        
              var token = authenticate.getToken({_id: req.user._id});
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json({success: true, status: 'Login Successful!', token: token});
        });
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
          return res.json({status: 'JWT invalid!', success: false, err: info});
        }
        else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          return res.json({status: 'JWT valid!', success: true, user: user});
    
        }
      }) (req, res);
}

const facebook = (req, res) => {
    if (req.user) {
        var token = authenticate.getToken({_id: req.user._id});
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, token: token, status: 'You are successfully logged in!'});
      }
}

export { getAllUser, userRegister, userLogin, checkJWTtoken, facebook};