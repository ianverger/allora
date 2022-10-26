const { check } = require("express-validator"); 
const handleValidationErrors = require('./handleValidationErrors'); 


   const validateActivityInput = [
        check('title')
            .exists({ checkFalsy: true})
            .withMessage('Please include a title'),
        check('startDate')
            .exists({ checkFalsy: true })
            .withMessage('Please enter a start date'),
        check('endDate')
            .exists({ checkFalsy: true })
            .withMessage('Please enter an end date'),
        handleValidationErrors

    ]
module.exports = validateActivityInput; 
