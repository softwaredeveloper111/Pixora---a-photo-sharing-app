const  { body, param, query }  = require("express-validator")
const expressValidatorHandleError = require("./error.validator")


const commentValidation = [
    body("text")
    .trim()
    .notEmpty()
    .withMessage("Comment is required")
    .isLength({min:1, max:150})
    .withMessage("Comment must be between 1 and 150 characters")
    ,
    expressValidatorHandleError
]




module.exports  = {commentValidation}