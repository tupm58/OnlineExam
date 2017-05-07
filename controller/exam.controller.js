/**
 * Created by MinhTu on 3/20/2017.
 */
var mongoose = require('mongoose'),
    path = require('path'),
    Exam = mongoose.model('Exam');

exports.create = function (req, res) {
    var exam = new Exam(req.body);
    console.log(req.user);
    exam.created_by = req.user;
    Exam.create(exam)
        .then(function (result) {
            res.jsonp(exam);
        }).catch(function (err) {
        console.log(err);
    });
};

exports.listExam = function (req, res) {
    var now = new Date();
    Exam.find({
            $or: [
                {
                    start_at: undefined
                },
                {
                    start_at: {
                        $lte: now
                    }
                }
            ]
        })
        .sort('-created_at')
        .select('_id name description created_at created_by')
        .exec()
        .then(function (exams) {
            res.jsonp(exams);
        }).catch(function (err) {
        console.log(err);
        return res.status(400).send({
            message: "exam list error"
        });

    })
};
exports.listExamByMe = function (req, res) {
    Exam.find({'created_by': req.user})
        .sort('-created_at')
        .select('_id name description created_at')
        .exec()
        .then(function (exams) {
            res.jsonp(exams);
        }).catch(function (err) {
        return res.status(400).send({
            message: "exam list error"
        });

    })
};

exports.detailExam = function (req, res) {
    var id = req.params.id;
    try {
        id = mongoose.Types.ObjectId(id);
    } catch (err) {
        return res.status(400).send({
            message: 'Exam is invalid'
        });
    }
    Exam.findOne(id)
        .populate('sections.questions', '_id name mark category answers.content answers._id img audio')
        .exec(function (err, exam) {
            if (err) {
                return res.status(400).send({
                    message: "exam list error"
                });
            } else {
                var timeTotal = 0;
                var listSection = exam.sections;
                listSection.forEach(function (section) {
                    timeTotal = section.timeInMinute + timeTotal
                });
                res.jsonp({
                    exam,
                    timeTotal: timeTotal
                });
            }
        })
};