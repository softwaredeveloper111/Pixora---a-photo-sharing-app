const {body, param, query} = require("express-validator")
const expressValidatorHandleError = require("./error.validator")
const AppError = require("../utils/ApiError")




const postCreateValidation =[


  body("caption")
  .trim()
  .optional()
  .isLength({max:100})
  .withMessage("caption should be less than 100 characters"),


  body("hashtags")
  .optional()
  .custom(value => {
    JSON.parse(value);
    return true;
  })
  .withMessage("Invalid hashtags"),

   (req, res, next) => {
    if (!req.file) {
      return next(new AppError("Image is required", 400));
    }
    next();
  },
  

  expressValidatorHandleError 

]






module.exports = {postCreateValidation}