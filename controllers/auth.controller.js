const authService = require("../service/auth.service");

class AuthController {
  async register(req, res, next) {
    try {
      const data = req.body;
      const user = await authService.register(data);
      res.cookie("refreshToken", user.refreshToken, {
        httpOnly: true,
        maxAge: 900000,
        secure: true,
      });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const data = req.body;
      const user = await authService.login(data);
      res.cookie("refreshToken", user.refreshToken, {
        httpOnly: true,
        maxAge: 900000,
        secure: true,
      });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await authService.logout(refreshToken);
      res.clearCookie("refreshToken");
      res.json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const data = await authService.refresh(refreshToken);

      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 900000,
        secure: true,
      });
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
