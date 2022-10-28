const { check } = require("express-validator"); 
const handleValidationErrors = require('./handleValidationErrors'); 


   const validateActivityInput = [
       check('trip')
           .exists({ checkFalsy: true })
           .withMessage('Please assign a trip'),
        check('title')
            .exists({ checkFalsy: true})
            .withMessage('Please include a title'),
        check('activityDate')
            .exists({ checkFalsy: true })
            .withMessage('Please enter your activity dates'),
 
        handleValidationErrors

    ]
module.exports = validateActivityInput; 
