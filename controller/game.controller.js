/**
 * Created by MinhTu on 4/12/2017.
 */
var mongoose = require('mongoose'),
    path = require('path'),
    Game = mongoose.model('Game'),
    User = mongoose.model('User');

exports.findGameById = function(req,res){
    let pin = req.params.id;
    Game.findOne({ pin: pin, active: true})
        .exec()
        .then(function(result){
            if (result){
                return res.status(200).send({
                    message: 'Pin is valid'
                });
            }else {
                return res.status(400).send({
                    message: 'Pin is invalid'
                });
            }
           
        }).catch(function(err){
        console.log(err);
            return res.status(400).send({
                message: 'Pin is invalid'
            });
        })
};

exports.showLeaderBoard = function(req,res){
    let pin = req.params.id;
    Game.aggregate([
        { "$match": { "pin": pin }},
        { "$unwind" : "$results" },
        {
            "$group" : {
                "_id": "$results.user",
                "totalScore": {
                    "$sum" : "$results.score"
                }
            }
        }
    ]).exec()
        .then(function(data){
            User.populate(data, {path: "_id"})
                .then(function(data){
                    res.jsonp(data)
                }).catch(function(err){
                    console.log(err);
            });
        }).catch(function(err){
            console.log(err);
    })
};