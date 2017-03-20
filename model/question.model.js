/**
 * Created by MinhTu on 3/20/2017.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var answerSchema = new Schema({
    answer: String,
    correct: Boolean
});
var question = new Schema({
    name : {
        type: String,
        required: 'Please fill Exam name'
    },
    mark : {
        type: Number
    },
    // created_by :{
    //     type: Schema.ObjectId,
    //     ref : 'User'
    // },
    category: {
        type: String
    },
    answers : [answerSchema]
});

mongoose.model('Question',question);