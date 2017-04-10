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

        socket.on('newGameCreated',function(data){
            console.log(data);
            var pin = data.gameId;
            socket.join(pin.toString());
            socket.emit('playerJoinGame',{
                message: "You are in room no." + pin
            });

        });

        socket.on('playerJoinGame',function(data){
            var pin = data.gameId;
            socket.join(pin.toString());
            socket.emit('playerJoinGame',{
                message: "You are in room no." + pin,
                username: data.username,
                socket: socket.id
            });
            socket.broadcast.to(pin.toString()).emit('connectToRoom', { 
                message: data.username + "connect to room no." +pin,
                username: data.username,
                avatar: data.avatar,
                userId: data.userId,
                socket: socket.id
            });

        });
    });
    
    return server;
};