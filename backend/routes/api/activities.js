const activitySchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate : {
        type: Date,
        required: true
    },
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    maxGuests : {
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