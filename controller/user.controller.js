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
                var payload = {id: user.id};
                // var token = jwt.sign(payload, setting.secretKey);
                // res.jsonp(user);
                return res.redirect('https://tupm58.github.io/oexam-huhu/#!/token/'+user.facebook.token);

                // return res.redirect('http://localhost:3000/#!/token/'+user.facebook.token);
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
        .exec()
        .then(function(user){
            if(user.local.password === password){
                var payload = {id: user.id};
                var token = jwt.sign(payload, setting.secretKey);
                res.json({
                    message: "ok",
                    token: token,
                    profile: user
                });
            }else{
                return res.status(400).send({
                    message: "no pass"
                });
            }
        }).catch(function(err){
            return res.status(400).send({
               message: "no user"
            });
    });
};

exports.getUser = function(req,res){
    console.log("Aaaaaaaaa" + req.body.token);
    User.findOne({'facebook.token': req.body.token})
        .exec()
        .then(function(user){
            console.log(user);
            var payload = {id: user.id};
            var token = jwt.sign(payload, setting.secretKey);
            res.jsonp({
                message: "FB ok",
                token: token,
                profile: user
            });
        }).catch(function(err){
            return res.status(400).send({
                message: "no user"
            });
    })
};