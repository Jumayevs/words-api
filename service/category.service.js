const categoryModel = require("../models/category.model");

class CategoryService {
  async getAll() {
    return await categoryModel.find().populate({
      path: "branch",
      populate: {
        path: "dict",
      },
    });
  }
  async newCategory(data) {
    const category = await categoryModel.create({ ...data });
    return category;
  }
}

module.exports = new CategoryService();
