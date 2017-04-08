/**
 * Created by MinhTu on 4/8/2017.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var quiz = new Schema({
   name: {
       type: String
   },
    created_at :{
        type: Date,
        default: Date.now
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }]
});

mongoose.model('Quiz',quiz);