const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors"); 

const validateCommentInput = [
    check('activity')
        .exists({ checkFalsy: true })
        .withMessage('Please assign comment to activity'),
    check('text')
        .exists({ checkFalsy: true })
        .isLength({ min: 1, max: 500 })
        .withMessage('Comment must be between 1 and 500 characters'),
    handleValidationErrors
];

module.exports = validateCommentInput;