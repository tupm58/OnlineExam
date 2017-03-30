/**
 * Created by MinhTu on 3/27/2017.
 */

var answerSheet = require('../controller/answerSheet.controller');

module.exports = function(app){
    app.route('/api/answerSheet').post(answerSheet.create);
    
    
};