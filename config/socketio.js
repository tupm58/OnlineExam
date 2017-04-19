/**
 * Created by MinhTu on 4/7/2017.
 */
var db = require('./mongoose')();
var mongoose = require('mongoose'),
    Game = mongoose.model('Game');
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
        socket.on('connected',function(data){
            socket.username = data.username;
            io.emit('connected',{
                username: data.username,
                examId: data.examId
            });
        });
        socket.on('disconnect', function (data) {
            io.emit('user disconnected',{
                message: socket.username + " disconnected"
            });
        });
        socket.on('newGameCreated',function(data){
            var pin = data.gameId;
            var game = new Game({
                pin: pin,
                created_by : data.host
            });
            Game.create(game)
                .then(function(result){
                    console.log(result);
                }).catch(function(err){
                    console.log(err);
            });
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
        socket.on('showQuestion',function(data){
            var pin = data.gameId;
            Game.update({ pin: pin }, { $set: { active: 'false' }})
                .exec()
                .then(function(result){
                    console.log(result);
                }).catch(function(err){
                console.log(err);
            });

            socket.broadcast.to(pin.toString()).emit('showQuestion',{
                question : data.question
            })
        });
        socket.on('showCorrectAnswer',function(data){
            var pin = data.gameId;
            socket.broadcast.to(pin.toString()).emit('showCorrectAnswer',{
                correctAnswer : data.correctAnswer
            })
        });
     
        socket.on('sendAnswer',function(data){
            var pin = data.gameId;
            //save to db -> emit leaderboard
            var result = {
                user: data.userId,
                score: data.score
            };
            console.log(result);
            Game.update({ pin: pin }, { $push: { results: result}})
                .exec()
                .then(function(result){
                    console.log(result);
                }).catch(function(err){
                    console.log(err);
            });
            socket.broadcast.to(pin.toString()).emit('receiveAnswer',{
                data : data
            })
        });
        
        socket.on('endGame',function(data){
            socket.emit('endGame',{
                message: data.message
            })
        })

        
    });
    
    return server;
};