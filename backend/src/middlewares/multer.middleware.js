
const multer = require("multer")
const AppError = require("../utils/AppError")

const storage = multer.memoryStorage();


const upload = multer({ 
   storage: storage ,
   limits:{
    fileSize:5*1024*1024
  }
  }) 


const handleMulterError = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return next(new AppError("File size must not exceed 5MB",400));
      }
      return next(err);
    }

    if (err) {
      return next(err);
    }

    next();
  });
};


module.exports = handleMulterError;