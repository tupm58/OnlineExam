/**
 * Created by MinhTu on 3/20/2017.
 */
var mongoose = require('mongoose'),
    passport = require('passport'),
    path = require('path'),
    User = mongoose.model('User'),
    Question = mongoose.model('Question');
exports.create = function(req,res){
    var question = new Question(req.body);
    question.created_by = req.user;
    Question.create(question)
        .then(function(result){
            // delete req.body.created_by;
            res.jsonp(result);
        }).catch(function(err){
            console.log(err);
        });
};