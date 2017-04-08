/**
 * Created by MinhTu on 4/7/2017.
 */
var config = require('./config.js'),
    path = require('path'),
    express = require('express'),
    http = require('http'),
    socket = require( 'socket.io' );

module.exports = function(app){
    var server;

    server = http.createServer(app);

    var io = socket(server);
    io.on('connection',function(socket){
        console.log("new connection");  
    });
    
    return server;
};