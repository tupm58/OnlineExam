/**
 * Created by MinhTu on 3/27/2017.
 */
var mongoose = require('mongoose'),
    path = require('path'),
    AnswerSheet = mongoose.model('AnswerSheet'),
    Exam = mongoose.model('Exam');

exports.create = function (req, res) {
    var answerSheet = new AnswerSheet(req.body);
    answerSheet.user = req.user;
    AnswerSheet.create(answerSheet)
        .then(function(result){
            console.log(1);
        }).catch(function(err){
            console.log(err);
    });
    Exam.findOne({_id: answerSheet.exam },'name sections.questions')
        .populate('sections.questions','_id name mark category answers.content answers._id')
        .exec(function(err,exam){
            if (err){
                console.log(err);
            }else {
                res.jsonp({
                    exam
                });
            }
        })
    

};