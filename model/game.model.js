/**
 * Created by MinhTu on 4/12/2017.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var result = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    score: Number
});
var game = new Schema({
    pin: {
        type: String,
        unique: true
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    active : {
        type: Boolean,
        default: true
    },
    results: [result]
});

mongoose.model('Game',game);