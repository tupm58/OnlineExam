var mongoose = require('mongoose'),
 bcrypt = require('bcrypt-nodejs'),
 Schema = mongoose.Schema;

var user = new Schema({
    local: {
        email: String,
        password: String
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String,
        username: String,
    }
});

user.methods.generateHash = function(password){

};
// module.exports = mongoose.model('User',user);
mongoose.model('User',user);