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
            res.jsonp({
                id: result._id
            });
        }).catch(function(err){
            console.log(err);
    });
};
exports.getDetail = function(req,res){
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
        .populate('sheet.question','_id mark answers.content answers.correct')
        .populate('exam','_id name')
        .then(function(result){
            var mark = 0;
            var totalMark = 0;
            var trueAnswer = 0;
            result.sheet.forEach(function(sheet){
                sheet.question.answers.forEach(function(answer){
                    if (answer.correct == true && answer.content == sheet.answer) {
                        mark = mark + sheet.question.mark;
                        trueAnswer++;
                    }
                });
                totalMark = totalMark + sheet.question.mark;
            });
            var markByPercent = mark/totalMark*100;
            if (result.mark == undefined){
                AnswerSheet.update({ _id : id},{
                    $set: {
                        mark : mark,
                        markByPercent : markByPercent
                    }
                }).then(function(res){
                    console.log("ok");
                }).catch(function(err){
                    console.log(er);
                })
            }
            res.jsonp({
                id: result._id,
                exam: result.exam.name,
                created_at : result.created_at,
                mark,
                trueAnswer,
                countQuestion: result.sheet.length,
                totalMark,
                markByPercent
            });
        }).catch(function(err){
        console.log(err);
    })
};