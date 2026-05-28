const  { body, param, query }  = require("express-validator")
const expressValidatorHandleError = require("./error.validator")



const registerUserValidation = [
body("fullname")
.trim()
.notEmpty()
.withMessage("Fullname is required")
.isLength({min:3,max:30})
.withMessage("Name should be between 3 and 30 characters")
.matches( /^[a-zA-Z\s.'-]+$/) 
/** This regex allows only letters, spaces, dots (.), apostrophes ('), and hyphens (-) in a full name, for example: Rahul Sharma, A. K. Sharma, O'Connor, and Anne-Marie. */
.withMessage("Invalid full name"),


body("username")
.trim()
.notEmpty()
.withMessage("Username is required")
.isLowercase()
.withMessage("Username must be in lowercase")
.isLength({min:3, max:20})
.withMessage("Username must be between 3 and 20 characters")
.matches(/^(?!.*[_.]{2})[a-z0-9._]+$/)
/**This regex allows only lowercase letters, numbers, dots (.), and underscores (_) in a username, while preventing consecutive dots or underscores like .. or __, for example: rahul123, john_doe, and dev.kumar are valid, but john__doe and rahul..123 are invalid. */
.withMessage("Invalid username"),




body("email")
.trim()
.notEmpty()
.withMessage("Email is required")
.isEmail()
.withMessage("Email is invalid")
.isLowercase()
.withMessage("Email must be in lowercase")
.normalizeEmail(),



body("password")
.trim()
.notEmpty()
.withMessage("Password is required")
.isLength({min:8, max:32})
.withMessage("Password must be between 8 and 32 characters")
.isAlphanumeric()
.withMessage("Password can only contain letters and numbers"),

expressValidatorHandleError

]


const loginUserValidation=[
    body("identifiers")
    .trim()
    .notEmpty()
    .withMessage("Identifiers is required"),
  

    body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required"),


    expressValidatorHandleError
]


module.exports = {registerUserValidation,loginUserValidation}