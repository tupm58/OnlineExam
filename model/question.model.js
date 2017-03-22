/**
 * Created by MinhTu on 3/20/2017.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var answerSchema = new Schema({
    content: String,
    correct: Boolean
});
var question = new Schema({
    name : {
        type: String,
        required: 'Please fill Exam name'
    },
    img : {
        type: String,
        default: ''
    },
    audio: {
        type: String,
        default: ''
    },
    mark : {
        type: Number
    },
    category: {
        type: String
    },
    answers : [answerSchema]
});

mongoose.model('Question',question);