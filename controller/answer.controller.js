/**
 * Created by MinhTu on 3/20/2017.
 */
var mongoose = require('mongoose'),
    passport = require('passport'),
    path = require('path'),
    User = mongoose.model('User'),
    Answer = mongoose.model('Answer');

exports.create = function(req,res){
    var answer = new Answer(req.body);
    Answer.create(answer)
        .then(function(result){
            res.jsonp(result);
        }).catch(function(err){
        console.log(err);
    })
};
