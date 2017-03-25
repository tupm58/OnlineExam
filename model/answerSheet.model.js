var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var answerSheet = new Schema({
   user : {
       type: Schema.Types.ObjectId,
       ref: 'User'
   },
    exam : {
        type: Schema.Types.ObjectId,
        ref: 'Exam'
    },
    
    
});