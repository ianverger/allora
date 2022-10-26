const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = Schema({
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    startDate: {
        type: String,
        required: true
    },
    endDate : {
        type: String,
        required: true
    },
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
    },
    lng: {
        type: Schema.Types.Decimal128
    },
    lat: {
        type: Schema.Types.Decimal128
    }
});

module.exports = mongoose.model('Activity', activitySchema); 