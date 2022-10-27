const { check } = require("express-validator"); 
const handleValidationErrors = require('./handleValidationErrors'); 

const validateTripInput = [
    check('tripDates')
        .exists({ checkFalsy: true})
        .withMessage('Please enter a date(s) for your Trip'),
    check('tripAttendees')
        .exists({ checkFalsy: true})
        .withMessage('Please include your travel pals'),
    check('city')
        .exists({ checkFalsy: true})
        .withMessage('Please enter a city'),
    check('country')
        .exists({ checkFalsy: true})
        .withMessage('Please enter a country'),
    check('tripTitle')
        .exists({ checkFalsy: true})
        .withMessage('Please enter a title for your trip'),
        handleValidationErrors

]

module.exports = validateTripInput; 