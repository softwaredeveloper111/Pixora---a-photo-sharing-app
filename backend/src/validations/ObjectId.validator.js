 const {param} = require("express-validator")
 const expressValidatorHandleError = require("./error.validator")

 const checkObjectId = [
    param("id")
    .trim()
    .notEmpty()
    .withMessage("Id is required")
    .isMongoId()
    .withMessage("Invalid id"),
    expressValidatorHandleError
 ]


 module.exports = checkObjectId
