const multer = require("multer")
const AppError = require("../utils/ApiError")

const storage = multer.memoryStorage();


const upload = multer({ 
   storage: storage ,
   limits:{
    fileSize:5*1024*1024
  }
  }) 


const multerErrorHandler = (multerMiddleware) => {
  return (req, res, next) => {
    multerMiddleware(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return next(
            new AppError("File size must not exceed 5MB", 400)
          );
        }

        return next(err);
      }

      if (err) {
        return next(err);
      }

      next();
    });
  };
};

const multerPostHandler = multerErrorHandler(upload.single('image'))


const multerUserProfileHandler = multerErrorHandler(
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "coverPhoto", maxCount: 1 },
  ])
);


module.exports = { multerPostHandler  ,  multerUserProfileHandler };