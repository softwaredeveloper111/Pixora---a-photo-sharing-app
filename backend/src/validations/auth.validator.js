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


module.exports = {registerUserValidation,}