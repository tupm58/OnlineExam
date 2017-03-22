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
            res.jsonp(exam);
        }).catch(function(err){
        console.log(err);
    });
};

exports.listExam = function(req,res){
    Exam.find()
        .sort('-created_at')
        .select('_id name description created_at created_by')
        .exec(function(err,exams){
            if(err){
                return res.status(400).send({
                    message: "exam list error"
                });   
            } else {
                res.jsonp(exams);
            }
        })
};

exports.detailExam = function (req,res) {
    var id = req.params.id;
    try {
        id = mongoose.Types.ObjectId(id);
    } catch (err) {
        return res.status(400).send({
            message: 'Exam is invalid'
        });
    }
    Exam.findOne(id)
        .populate('sections.questions','_id name mark category answers.content answers._id')
        .exec(function(err,exam){
            if(err){
                return res.status(400).send({
                    message: "exam list error"
                });
            } else {
                res.jsonp(exam);
            }
        })
};