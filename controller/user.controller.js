/**
 * Created by MinhTu on 3/12/2017.
 */
var mongoose = require('mongoose'),
    passport = require('passport'),
    path = require('path'),
    User = mongoose.model('User');

module.exports.oauthCall = function (strategy, scope) {
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
module.exports.oauthCallback = function (strategy) {
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

                return res.redirect('/test');
            });
        })(req, res, next);
    }
};