const BaseError = require("../errors/base.error");
const tokenService = require("../service/token.service");

module.exports = async function (req, res, next) {
  const authorization = req.headers.authorization;
  const accessToken = authorization.split(" ")[1];

  if (!accessToken) {
    return new BaseError.BadRequest("Token not provided");
  }

  const userData = tokenService.validateAccessToken(accessToken);

  if (!userData) {
    return new BaseError.UnAuthorizedError();
  }

  req.user = userData;
  next();
};
