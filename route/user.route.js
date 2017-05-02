/**
 * Created by MinhTu on 3/12/2017.
 */
var users = require('../controller/user.controller');

module.exports = function(app){
    app.route('/secret');
    app.route('/api/user').post(users.getUser);

};