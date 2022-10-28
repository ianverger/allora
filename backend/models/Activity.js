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
    description: {
        type: String
    },
    date: {
        type: String
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Activity', activitySchema); 