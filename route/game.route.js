/**
 * Created by MinhTu on 4/12/2017.
 */
var game = require('../controller/game.controller');
var passport = require('passport');

module.exports = function(app){

    app.route('/api/game/checkPin/:id').get(game.findGameById);

    app.route('/api/game/leaderboard/:id').get(game.showLeaderBoard);

};