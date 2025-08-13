const jwt = require("jsonwebtoken");
const tokenModel = require("../models/token.model");
const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = require("../config/env");

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: "1m",
    });
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    return { accessToken, refreshToken };
  }

  async saveToken(userId, refreshToken) {
    const tokendb = await tokenModel.findOne({ user: userId });
    if (tokendb) {
      tokendb.refreshToken = refreshToken;
      return tokendb.save();
    }
    const newToken = await tokenModel.create({ user: userId, refreshToken });
    return newToken;
  }

  validateAccessToken(accessToken) {
    return jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
  }
  validateRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
  }
  async removeToken(refreshToken) {
    return await tokenModel.findOneAndDelete(refreshToken);
  }
  async findToken(token) {
    return await tokenModel.findOne({ refreshToken: token });
  }
}

module.exports = new TokenService();
