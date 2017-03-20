
var questions = require('../controller/question.controller');
var passport = require('passport');
var authenticationMiddleware   = require('../config/middleware.js');

module.exports = function(app){
    
    app.get('/',function(req,res){
        res.jsonp("a");
    });
    app.route('/api/question').post(questions.create);
};