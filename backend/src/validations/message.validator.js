const  { body, param, query }  = require("express-validator")
const expressValidatorHandleError = require("./error.validator")





const sendMessageValidation = [
    body("text")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({min:1, max:1000})
    .withMessage("Message must be between 1 and 1000 characters")
    ,
    expressValidatorHandleError
]

module.exports = {sendMessageValidation}