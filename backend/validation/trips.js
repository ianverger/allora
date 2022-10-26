const { check } = require("express-validator"); 
const handleValidationErrors = require('./handleValidationErrors'); 

const validateTripInput = [
    check('startDate')
        .exists({ checkFalsy: true})
        .withMessage('Please enter a start date'),
    check('endDate')
        .exists({ checkFalsy: true})
        .withMessage('Please enter an end date'),
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