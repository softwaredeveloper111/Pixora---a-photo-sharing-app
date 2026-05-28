const  { body, param, query }  = require("express-validator")
const expressValidatorHandleError = require("./error.validator")




const followStatusValidation = [
    body("status")
    .trim()
    .notEmpty()
    .withMessage("status is required")
    .isIn(["accept" , "reject"]) 
    .withMessage("Invalid status")
    ,

    expressValidatorHandleError
]



module.exports = {
    followStatusValidation
}