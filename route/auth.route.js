/**
 * Created by MinhTu on 3/19/2017.
 */
var users = require('../controller/user.controller');
var passport = require('passport');
var authenticationMiddleware   = require('../config/middleware.js');

module.exports = function(app){
    app.route('/api/auth/facebook').get(users.oauthCall('facebook',{
        scope: ['email']
    }));
    app.route('/api/auth/facebook/callback').get(users.oauthCallback('facebook',{
    }));

    app.get('/secret',passport.authenticate('jwt', { session: true }),function(req,res){
        res.jsonp(req.user);
    });
    app.get('/test',authenticationMiddleware.authenticationMiddleware() ,function(req,res){
        res.jsonp(req.user);
    });

    app.route('/login').post(users.login);

};