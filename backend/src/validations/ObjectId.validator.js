const { param } = require("express-validator");
const expressValidatorHandleError = require("./error.validator");

const validateObjectId = (fieldName = "id") => [
  param(fieldName)
    .trim()
    .notEmpty()
    .withMessage(`${fieldName} is required`)
    .isMongoId()
    .withMessage(`Invalid ${fieldName}`),

  expressValidatorHandleError
];

module.exports = validateObjectId;




