/**
 * Created by MinhTu on 3/27/2017.
 */

var answerSheet = require('../controller/answerSheet.controller');
var passport = require('passport');

module.exports = function(app){
    app.route('/api/answerSheet').post(passport.authenticate('jwt', { session: false }),answerSheet.createAnswer);
    
    app.route('/api/answerSheet/:id').get(answerSheet.getDetail);

    app.route('/api/answerSheet').get(passport.authenticate('jwt', { session: false }),answerSheet.getResultByUser);

    app.route('/api/answerSheet/exam/:examId').get(answerSheet.getResultByExam);
    
    app.route('/api/answerSheet/exam/:examId/export-xls').get(answerSheet.exportXls);
};