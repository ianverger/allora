const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const commentSchema = Schema({
    publisher: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    activity: {
        type: Schema.Types.ObjectId,
        ref: 'Activity',
        required: true
    },
    text: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);