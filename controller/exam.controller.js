/**
 * Created by MinhTu on 3/20/2017.
 */
var mongoose = require('mongoose'),
    path = require('path'),
    Exam = mongoose.model('Exam');

exports.create = function(req,res){
    var exam = new Exam(req.body);
    exam.created_by = req.user;
    Exam.create(exam)
        .then(function(result){
            // delete req.body.created_by;
            res.jsonp(result);
        }).catch(function(err){
        console.log(err);
    });
};