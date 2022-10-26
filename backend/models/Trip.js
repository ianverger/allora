const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = Schema({
    planner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tripTitle: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate : {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Trip', tripSchema); 