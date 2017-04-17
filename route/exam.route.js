/**
 * Created by MinhTu on 3/13/2017.
 */
var exams = require('../controller/exam.controller');
var passport = require('passport');

module.exports = function(app){
    app.route('/api/exam').post(exams.create);
    
    app.route('/api/exam/me').get(passport.authenticate('jwt', { session: false }),exams.listExamByMe);
    app.route('/api/exam').get(exams.listExam);

    app.route('/api/exam/:id').get(exams.detailExam);
    
    // app.get('/api/huhu/huhu',function(req,res){
    //     res.jsonp(req.user);
    // })
};