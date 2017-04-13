/**
 * Created by MinhTu on 4/8/2017.
 */
var mongoose = require('mongoose'),
    path = require('path'),
    Quiz = mongoose.model('Quiz');

exports.create = function(req,res){
    var quiz = new Quiz(req.body);
    console.log(req.user);
    quiz.created_by = req.user;
    Quiz.create(quiz)
        .then(function(result){
            res.jsonp(result);
        }).catch(function(err){
        console.log(err);
    });
};

exports.listQuizByUser = function(req,res){
    Quiz.find({ 'created_by': req.user._id})
        .exec()
        .then(function(quizes){
            res.jsonp(quizes)
        }).catch(function(err){
            return res.status(400).send({
               message: "exam list error"
            });
        })
};

exports.getQuizDetail = function(req,res){
    var id = req.params.id;
    try {
        id = mongoose.Types.ObjectId(id);
    } catch (err) {
        return res.status(400).send({
            message: 'Quiz is invalid'
        });
    }
    Quiz.findOne(id)
        .populate('questions','_id name mark category answers.content answers.correct answers._id img audio')
        .exec()
        .then(function(quiz){
            res.jsonp(quiz);
        }).catch(function(err){
            return res.status(400).send({
                message: 'Quiz is invalid'
            });
        });

};