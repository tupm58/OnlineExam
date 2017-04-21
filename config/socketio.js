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
    var connectedMember = [];

    io.on('connection',function(socket){
        socket.on('room', function(data) {// take room variable from client side
            var room = data.examId;
            socket.join(room); // and join it
            socket.on('joinSuccess',function(){
                connectedMember.push({username: data.username, created: Date.now()});
                io.sockets.in(room).emit('listOnline',{
                    listOnline : connectedMember
                });
                console.log(connectedMember);

            });

            socket.broadcast.to(room).emit('connectToStudentRoom', {      // Emits a status message to the connect room when a socket client is connected
                type: 'status',
                text: 'Is now connected',
                created: Date.now(),
                username: data.username
            });

            socket.on('disconnect', function () {// Emits a status message to the connected room when a socket client is disconnected
                console.log(room);
                io.sockets.in(room).emit('disconnect',{
                    type: 'status',
                    text: 'disconnected',
                    created: Date.now(),
                    username: data.username
                });
                connectedMember = connectedMember.filter(function(value){
                    if(value.username === data.username){
                        return false;
                    }
                    return value;
                });
                io.sockets.in(room).emit('listOnline',{
                    listOnline : connectedMember
                });
                console.log("disconnect.");
            })
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