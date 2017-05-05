/**
 * Created by MinhTu on 3/27/2017.
 */
var mongoose = require('mongoose'),
    path = require('path'),
    AnswerSheet = mongoose.model('AnswerSheet'),
    Exam = mongoose.model('Exam');
var json2xls = require('json2xls');
var json2csv = require('json2csv');

var fs = require('fs');
exports.createAnswer = function (req, res) {
    var answerSheet = new AnswerSheet(req.body);
    answerSheet.user = req.user;
    AnswerSheet.create(answerSheet)
        .then(function (result) {
            console.log(1);
            res.jsonp({
                id: result._id
            });
        }).catch(function (err) {
        console.log(err);
    });
};
exports.getDetail = function (req, res)  {
    var id = req.params.id;
    try {
        id = mongoose.Types.ObjectId(id);
    } catch (err) {
        return res.status(400).send({
            message: 'Exam is invalid'
        });
    }
    AnswerSheet.findOne(id)
        .select('_id created_at user sheet mark exam')
        .populate('sheet.question', '_id mark answers.content answers.correct')
        .populate('exam', '_id name')
        .then(function (result) {
            var mark = 0;
            var totalMark = 0;
            var trueAnswer = 0;
            result.sheet.forEach(function (sheet) {
                sheet.question.answers.forEach(function (answer) {
                    if (answer.correct == true && answer.content == sheet.answer) {
                        mark = mark + sheet.question.mark;
                        trueAnswer++;
                    }
                });
                totalMark = totalMark + sheet.question.mark;
            });
            var markByPercent = mark / totalMark * 100;
            if (result.mark == undefined) {
                AnswerSheet.update({_id: id}, {
                    $set: {
                        mark: mark,
                        markByPercent: Math.ceil(markByPercent)
                    }
                }).then(function (res) {
                    console.log("ok");
                }).catch(function (err) {
                    console.log(er);
                })
            }
            res.jsonp({
                id: result._id,
                exam: result.exam.name,
                created_at: result.created_at,
                mark,
                trueAnswer,
                countQuestion: result.sheet.length,
                totalMark,
                markByPercent
            });
        }).catch(function (err) {
        console.log(err);
    })
};

exports.getResultByUser = function (req, res) {
    AnswerSheet.find({'user': req.user._id})
        .select('_id exam created_at mark markByPercent')
        .populate('exam', 'name')
        .exec()
        .then(function (results) {
            res.jsonp(results)
        }).catch(function (err) {
        return res.status(400).send({
            message: "results list error"
        });
    })
};

exports.getResultByExam = function (req, res) {
    var examId = req.params.examId;
    AnswerSheet.find({exam: examId})
        .populate('user', '_id local.username facebook.name')
        .populate('exam', 'name')
        .select('_id exam user created_at mark markByPercent')
        .exec()
        .then(function (results) {
            var mark1 = results.filter(function(result){
               return result.markByPercent >= 80;
            });
            var mark2 = results.filter(function(result){
                return (result.markByPercent < 80 && result.markByPercent >50);
            });
            var mark3 = results.filter(function(result){
                return result.markByPercent <= 50;
            });
            res.jsonp({
                result: results,
                doTime : results.length,
                mark: {
                    mark1: mark1.length,
                    mark2: mark2.length,
                    mark3: mark3.length
                },
                pass: {
                    markPass : mark2.length + mark1.length
                }
            });
        }).catch(function (err) {
        return res.status(400).send({
            message: "results list error"
        })
    });
};

exports.exportXls = function (req, res) {
    var examId = req.params.examId;
    AnswerSheet.find({exam: examId})
        .populate('user', '_id local.username facebook.name')
        .populate('exam', 'name')
        .select('_id exam user created_at mark markByPercent')
        .exec()
        .then(function (results) {
            console.log(results);
            var fields = ['_id', 'user.local.username', 'user.facebook.name', 'exam.name', 'mark', 'markByPercent', 'created_at'];
            var fieldNames = ['_id', 'Username', 'Facebook name','Exam', 'Mark', 'Percent', 'Date'];
            try {
                var opts = {
                    data: results,
                    fields: fields,
                    fieldNames: fieldNames,
                    quotes: ' '
                };
                var result = json2csv(opts);
                var path = './download/' + examId + '.csv';
                fs.writeFile(path, "\uFEFF" + result, function (err) {
                    if (err) throw err;
                    // res.download(path);
                    return res.status(200).send({
                        message: "results list save",
                        path: path
                    })
                });
            } catch (err) {
                // Errors are thrown for bad options, or if the data is empty and no fields are provided. 
                // Be sure to provide fields if it is possible that your data array will be empty. 
                console.error(err);
            }
        }).catch(function (err) {
        return res.status(400).send({
            message: "results list error"
        })
    });
};

exports.downloadResult = function (req, res) {
    var filePath = req.params.file;
    res.download('./download/' + filePath);
};