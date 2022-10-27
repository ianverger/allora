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
    tripDates:[{
        type: String,
        required: true
    }],
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
    maxGuests: {
        type: Number
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    zipCode: {
        type: String
    }
    
});

module.exports = mongoose.model('Activity', activitySchema); 