/**
 * Created by MinhTu on 4/12/2017.
 */
var mongoose = require('mongoose'),
    path = require('path'),
    Game = mongoose.model('Game');

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
    Game.findOne({ pin: pin})
        .populate('results')
        .exec()
        .then(function(result){
            if (result){
                res.jsonp(result);
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