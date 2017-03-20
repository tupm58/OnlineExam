/**
 * Created by MinhTu on 3/20/2017.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var answer = new Schema({
    content : String,
    correct : Boolean
});
mongoose.model('Answer',answer);