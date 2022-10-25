const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = Schema({
    planner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate : {
        type: Date,
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
    tmestamps: true
});