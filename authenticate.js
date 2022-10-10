import passport from  'passport' ;
import Local from  'passport-local';
const LocalStrategy = Local.Strategy
import User from  './models/user' ;
import Jwt from  'passport-jwt' ;
const JwtStrategy = Jwt.Strategy
import ExtractJwt1 from  'passport-jwt';
const ExtractJwt = ExtractJwt1.ExtractJwt
import jwt from  'jsonwebtoken' ; // used to create, sign, and verify tokens

import config from  './config.js' ;
import FacebookTokenStrategy from  'passport-facebook-token';

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
    }

    var err = new Error("You are not authorized to perform this operation!");
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 403;
    return next(err);

    
}




const facebookPassport = passport.use(new FacebookTokenStrategy({
    clientID: config.facebook.clientId,
    clientSecret: config.facebook.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({facebookId: profile.id}, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (!err && user !== null) {
            return done(null, user);
        }
        else {
            user = new User({ username: profile.displayName });
            user.facebookId = profile.id;
            user.firstname = profile.name.givenName;
            user.lastname = profile.name.familyName;
            user.save((err, user) => {
                if (err)
                    return done(err, false);
                else
                    return done(null, user);
            })
        }
    });
}
));

export { getToken, jwtPassport, verifyUser, verifyAdmin, facebookPassport};