class ApiResponse {
  constructor(statusCode, success, message, data = null, meta = null) {
    this.statusCode = statusCode;
    this.success = success;
    this.message = message;
    this.data = data;
    this.meta = meta;
  }

  static success(message = "Success", data = null, meta = null) {
    return new ApiResponse(200, true, message, data, meta);
  }

  static created(message = "Created Successfully", data = null) {
    return new ApiResponse(201, true, message, data);
  }

  static error(message = "Something went wrong") {
    return new ApiResponse(500, false, message);
  }
}

module.exports = ApiResponse;
