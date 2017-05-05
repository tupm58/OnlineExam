/**
 * Created by MinhTu on 3/19/2017.
 */
var  mongoose = require('mongoose'),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),

    FacebookStrategy = require('passport-facebook').Strategy,
    passportJWT = require('passport-jwt'),
    ExtractJwt = passportJWT.ExtractJwt,
    JWTStrategy = passportJWT.Strategy,

    configAuth = require('./auth'),
    setting = require('./setting');

var authenticationMiddleware   = require('./middleware.js');
module.exports = function () {
    var User = mongoose.model('User');

    //serialize user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    //deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: ['id', 'email', 'displayName','photos'],
    }, function (token, refreshToken, profile, done) {
        process.nextTick(function () {
            User.findOne({'facebook.id': profile.id}, function (err, user) {
                if (err)
                    return done(err);
                if (user) {
                    return done(null, user);
                } else {
                    var newUser = new User();
                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = token;
                    newUser.facebook.name = profile.displayName;
                    if (!profile.emails){
                        newUser.facebook.email = "";
                    }else {
                        newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();
                    }
                    // newUser.facebook.img = (profile.photos[0].value || '').toLowerCase();
                    newUser.facebook.img = ('graph.facebook.com/' + profile.id + '/picture?type=large' || '').toLowerCase();

                    newUser.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        })
    }));
    // passport.authenticationMiddleware =authenticationMiddleware.authenticationMiddleware ;

    var jwtOptions = {};
    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
    jwtOptions.secretOrKey = setting.secretKey;

    passport.use(new JWTStrategy(jwtOptions,function(jwt_payload,next){
        User.findOne({_id: jwt_payload.id}, function (err, user) {
           if (user){
               next(null,user);
           }else{
               next(null,false);
           }
        });
    }));
};

