const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const UserDto = require("../dto/user.dto");
const tokenService = require("./token.service");
const BaseError = require("../errors/base.error");
class AuthService {
  async register(data) {
    const existUser = await userModel.findOne({ phone: data.phone });
    if (existUser) {
      throw BaseError.BadRequest("User is exist with this phone number.");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await userModel.create({
      ...data,
      password: hashedPassword,
    });
    const userDto = new UserDto(newUser);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { userDto, ...tokens };
  }
  async login(data) {
    const { phone, password } = data;
    const user = await userModel.findOne({ phone });
    if (!user) {
      throw BaseError.BadRequest("User not found.");
    }
    const isPhone = phone === user.phone;
    if (!isPhone) {
      throw BaseError.BadRequest("Phone is incorrect.");
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      throw BaseError.BadRequest("Password is incorrect");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { userDto, ...tokens };
  }
  async logout(refreshToken) {
    return await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    const userData = tokenService.validateRefreshToken(refreshToken);
    const token = await tokenService.findToken(refreshToken);
    if (!userData || !token) {
      throw BaseError.UnAuthorizedError();
    }

    const user = await userModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }
}

module.exports = new AuthService();
