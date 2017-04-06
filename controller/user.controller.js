/**
 * Created by MinhTu on 3/12/2017.
 */
var mongoose = require('mongoose'),
    passport = require('passport'),
    path = require('path'),
    jwt = require('jsonwebtoken'),
    User = mongoose.model('User'),
    setting = require('../config/setting');

exports.oauthCall = function (strategy, scope) {
    return function (req, res, next) {
        // Set redirection path on session.
        // Do not redirect to a signin or signup page
        // if (noReturnUrls.indexOf(req.query.redirect_to) === -1) {
        //     req.session.redirect_to = req.query.redirect_to;
        // }
        // Authenticate
        passport.authenticate(strategy, scope)(req, res, next);
    };
};
exports.oauthCallback = function (strategy) {
    return function (req, res, next) {
        passport.authenticate(strategy,function(err, user, info){
            // var sessionRedirectURL = req.session.redirect_to;
            if (err) {
                // return res.redirect('/authentication/signin?err=' + encodeURIComponent(errorHandler.getErrorMessage(err)));
                console.log(err);
            }
            if (!user) {
                // return res.redirect('/authentication/signin');
            }
            req.login(user, function (err) {
                if (err) {
                    // return res.redirect('/authentication/signin');
                    console.log(err);
                }
                res.jsonp(user);
                // return res.redirect('http://localhost:3000/#!/dashboard');
            });
        })(req, res, next);
    }
};
exports.login = function(req,res){
    if (req.body.username && req.body.password) {
        var username = req.body.username;
        var password = req.body.password;
    }
    User.findOne({'local.username': username})
        .exec(function (err,user){
            if (err){
                return res.status(400).send({
                    message: "no user"
                });
            }else {
                if(user.local.password === password){
                    var payload = {id: user.id};
                    var token = jwt.sign(payload, setting.secretKey);
                    res.json({message: "ok", token: token});
                }else{
                    return res.status(400).send({
                        message: "no pass"
                    });
                }
            }
        })
};