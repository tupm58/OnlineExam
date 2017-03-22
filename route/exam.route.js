/**
 * Created by MinhTu on 3/13/2017.
 */
var exams = require('../controller/exam.controller');
    
module.exports = function(app){
    app.route('/api/exam').post(exams.create);
    
    app.route('/api/exam').get(exams.listExam);

    app.route('/api/exam/:id').get(exams.detailExam);
};