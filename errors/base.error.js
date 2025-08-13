module.exports = class BaseError extends Error {
  statusCode;
  errors;
  constructor(status, message, errors) {
    super(message);
    this.statusCode = status;
    this.errors = errors;
  }

  static UnAuthorizedError() {
    return new BaseError(401, "User is not authorized.");
  }
  static BadRequest(message, errors = []) {
    return new BaseError(400, message, errors);
  }
};
