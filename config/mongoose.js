/**
 * Created by MinhTu on 3/5/2017.
 */
var config = require('./config'),
    mongoose = require('mongoose');

module.exports = () => {
    var db = mongoose.connect(config.db);
    
    require('../model/user.model.js');
    console.log('connect db!');
    return db;
};