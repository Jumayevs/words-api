const categoryService = require("../service/category.service");

class CategoryController {
  async getCategory(req, res, next) {
    try {
      const data = await categoryService.getAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  async newCategory(req, res, next) {
    try {
      const data = await categoryService.newCategory(req.body);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new CategoryController();
