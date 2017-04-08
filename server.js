process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'),
    config = require('./config/config'),
    express = require('./config/express'),
    socketio = require('./config/socketio'),
    passport = require('./config/passport');


var db = mongoose(),
    app = express(),
    server = socketio(app);
    passport = passport();

server.listen(config.port);
module.exports = server;
console.log(process.env.NODE_ENV + ' server running at http://localhost:' + config.port);