var mongoose = require('mongoose'),
 bcrypt = require('bcrypt-nodejs'),
 Schema = mongoose.Schema;

var user = new Schema({
    local: {
        email: String,
        username:String,
        password: String,
        token:String,
        img: String
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String,
        username: String,
        img: String
    }
},{
    toObject: {
        transform: function (doc, user) {
            delete user.local.password;
        }
    },
    toJSON: {
        transform: function (doc, user) {
            delete user.local.password;
        }
    }

});

// user.methods.generateHash = function(password){
//
// };
// module.exports = mongoose.model('User',user);
mongoose.model('User',user);