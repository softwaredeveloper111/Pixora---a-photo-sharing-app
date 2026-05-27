const { validationResult } = require("express-validator");
const AppError = require("../utils/AppError");

function expressValidatorHandleError (req, res, next) {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const validationError = new AppError("Validation failed", 400, errors.array());
      return next(validationError);
    }
    next()
}
    
module.exports = expressValidatorHandleError