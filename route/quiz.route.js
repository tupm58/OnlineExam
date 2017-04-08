/**
 * Created by MinhTu on 4/8/2017.
 */
var quiz = require('../controller/quiz.controller');
var passport = require('passport');

module.exports = function(app){
    app.route('/api/quiz').post(passport.authenticate('jwt', { session: false }),quiz.create);

    app.route('/api/quiz').get(passport.authenticate('jwt', { session: false }),quiz.listQuizByUser);

    app.route('/api/quiz/:id').get(passport.authenticate('jwt', { session: false }),quiz.getQuizDetail);


};