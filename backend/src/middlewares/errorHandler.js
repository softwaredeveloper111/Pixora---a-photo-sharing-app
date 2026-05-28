

const errorHandler = (err, req, res, next) => {

  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  const errors = err.errors || err.details;

  const responseBody = {
    success: false,
    message: message,
    statusCode: statusCode,
  };

  if (errors && errors.length > 0) {
    responseBody.errors = errors;
  }

  if (process.env.NODE_ENV === "development") {
    responseBody.stack = err.stack;
    return res.status(statusCode).json(responseBody);
  }

  res.status(statusCode).json(responseBody);

};

module.exports = errorHandler