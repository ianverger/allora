const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = Schema({
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    trip:{
        type: Schema.Types.ObjectId,
        ref: 'Trip',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    activityDate: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    votes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Activity', activitySchema); 