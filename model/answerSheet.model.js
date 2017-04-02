var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var answerSheet = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    exam: {
        type: Schema.Types.ObjectId,
        ref: 'Exam'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    sheet: [{
        question: {
            type: Schema.Types.ObjectId,
            ref: 'Question'
        },
        answer: {
            type: String
        }
    }],
    mark: Number,
    markByPercent : Number
});
mongoose.model('AnswerSheet',answerSheet);