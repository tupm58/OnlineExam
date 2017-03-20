/**
 * Created by MinhTu on 3/5/2017.
 */
var config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    passport = require('passport'),

    glob = require("glob"),
    path = require("path"),
    session = require('express-session');

module.exports = function () {
    var app = express();
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: 'OurSuperSecretCookieSecret'
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    var pattern = path.join(__dirname,'../route/*.route.js');
    glob(pattern, function (er, files) {
        files.forEach(function(file){
            require(file)(app);
        });
    });
    console.log("route ok");
    return app;
};