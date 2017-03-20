/**
 * Created by MinhTu on 3/13/2017.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var exam = new Schema({
    name: {
        type: String,
        required: 'Please fill Exam name',
        trim: true
    },
    description: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    sections: [{
        name: String,
        description: String,
        timeInMinute: Number,
        questions: [{
            type: Schema.Types.ObjectId,
            ref: 'Question'
        }]
    }]
});

mongoose.model('Exam',exam);