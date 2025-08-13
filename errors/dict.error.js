module.exports = class DictError extends Error {
  constructor() {
    super(message);
  }
  static duplicateDictError(message) {
    return new Error(message);
  }
};
