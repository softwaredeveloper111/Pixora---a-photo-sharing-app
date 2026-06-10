

class ApiResponse {
  constructor(statusCode , data,  message = "successfully completed ✅") {
    this.success = true;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

module.export = ApiResponse ;