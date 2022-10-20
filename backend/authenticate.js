import passport from  'passport' ;
import Local from  'passport-local';
const LocalStrategy = Local.Strategy
import User from  './models/userModel.js' ;
import Jwt from  'passport-jwt' ;
const JwtStrategy = Jwt.Strategy
import ExtractJwt1 from  'passport-jwt';
const ExtractJwt = ExtractJwt1.ExtractJwt
import jwt from  'jsonwebtoken' ; // used to create, sign, and verify tokens

import config from  './config.js' ;




passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




const getToken = function(user) {
    return jwt.sign(user, config.secretKey,
        {expiresIn: 3600});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

const jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

const verifyUser = passport.authenticate('jwt', {session: false});

const verifyAdmin = function (req, res, next) {
    if(req.user.admin){
        next()
    }else {
        var err = new Error("You are not authorized to perform this operation! ada yang salah di data user kamu !kamu tidak lolos admin");
        // res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 403;
        return next(err);
    }
    
}





export { getToken, jwtPassport, verifyUser, verifyAdmin};